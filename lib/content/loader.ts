import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import {
  CategoryCatalogSchema,
  ComparisonSchema,
  ConceptCatalogSchema,
  ConceptSchema,
  type Category,
  type CategoryCatalog,
  type Comparison,
  type ConceptCatalog
} from "@/lib/validation/schemas";
import { ContentValidationError } from "@/lib/validation/errors";

type ContentFile = {
  file_path: string;
  document: unknown;
};

export type ContentCatalog = {
  categories: CategoryCatalog;
  concepts: ConceptCatalog;
  comparisons: Comparison[];
};

const CONTENT_FILE_EXTENSIONS = new Set([".yaml", ".yml"]);

async function readContentFiles(directory_path: string): Promise<ContentFile[]> {
  const entries = await readdir(directory_path, { withFileTypes: true });
  const file_names = entries
    .filter((entry) => entry.isFile() && CONTENT_FILE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort();

  return Promise.all(
    file_names.map(async (file_name) => {
      const file_path = path.join(directory_path, file_name);
      const source = await readFile(file_path, "utf8");

      try {
        return { file_path, document: parseYaml(source) };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Erreur YAML inconnue.";
        throw new ContentValidationError(file_path, [
          {
            code: "custom",
            path: [],
            message: `YAML invalide : ${message}`
          }
        ]);
      }
    })
  );
}

export function parseCategoryCatalogDocument(document: unknown, file_path = "<document>") {
  const result = CategoryCatalogSchema.safeParse(document);
  if (!result.success) {
    throw new ContentValidationError(file_path, result.error.issues);
  }
  return result.data;
}

async function loadCategoryCatalog(file_path: string): Promise<CategoryCatalog> {
  let document: unknown;

  try {
    document = parseYaml(await readFile(file_path, "utf8"));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur YAML inconnue.";
    throw new ContentValidationError(file_path, [
      {
        code: "custom",
        path: [],
        message: `YAML invalide : ${message}`
      }
    ]);
  }

  return parseCategoryCatalogDocument(document, file_path);
}

function categoryPathExists(category_catalog: CategoryCatalog, category: Category): boolean {
  const primary = category_catalog.primary.find((item) => item.id === category.primary);
  const secondary = primary?.secondary.find((item) => item.id === category.secondary);
  return secondary?.tertiary.some((item) => item.id === category.tertiary) ?? false;
}

function validateConceptCategories(
  concepts: ConceptCatalog,
  category_catalog: CategoryCatalog,
  file_path: string
): void {
  const issues = concepts.flatMap((concept, concept_index) => {
    if (categoryPathExists(category_catalog, concept.category)) {
      return [];
    }

    return [
      {
        code: "custom" as const,
        path: [concept_index, "category"],
        message: `La catégorie ne correspond pas à un chemin contrôlé : ${concept.category.primary} / ${concept.category.secondary} / ${concept.category.tertiary}.`
      }
    ];
  });

  if (issues.length > 0) {
    throw new ContentValidationError(file_path, issues);
  }
}

export function parseConceptDocument(document: unknown, file_path = "<document>") {
  const result = ConceptSchema.safeParse(document);
  if (!result.success) {
    throw new ContentValidationError(file_path, result.error.issues);
  }
  return result.data;
}

export function parseComparisonDocument(document: unknown, file_path = "<document>") {
  const result = ComparisonSchema.safeParse(document);
  if (!result.success) {
    throw new ContentValidationError(file_path, result.error.issues);
  }
  return result.data;
}

async function validatePublishedAssets(concepts: ConceptCatalog, root_directory: string): Promise<void> {
  for (const [concept_index, concept] of concepts.entries()) {
    if (concept.status !== "published" || !concept.visuals.isolated) {
      continue;
    }

    const relative_asset_path = concept.visuals.isolated.replace(/^[/\\]+/, "");
    const asset_path = path.resolve(root_directory, relative_asset_path);

    try {
      const asset_stats = await stat(asset_path);
      if (!asset_stats.isFile()) {
        throw new Error("Le chemin ne pointe pas vers un fichier.");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Asset introuvable.";
      throw new ContentValidationError(root_directory, [
        {
          code: "custom",
          path: [concept_index, "visuals", "isolated"],
          message: `L'asset publié est invalide (${concept.visuals.isolated}) : ${message}`
        }
      ]);
    }
  }
}

async function parseConceptCatalog(
  directory_path: string,
  root_directory: string,
  category_catalog: CategoryCatalog
): Promise<ConceptCatalog> {
  const files = await readContentFiles(directory_path);
  const concepts = files.map(({ document, file_path }) => parseConceptDocument(document, file_path));
  const result = ConceptCatalogSchema.safeParse(concepts);

  if (!result.success) {
    throw new ContentValidationError(directory_path, result.error.issues);
  }

  validateConceptCategories(result.data, category_catalog, directory_path);
  await validatePublishedAssets(result.data, root_directory);

  return result.data;
}

export async function loadConceptCatalog(
  directory_path: string,
  root_directory = path.resolve(directory_path, "..", "..")
): Promise<ConceptCatalog> {
  const category_catalog = await loadCategoryCatalog(path.join(root_directory, "content", "categories.yaml"));
  return parseConceptCatalog(directory_path, root_directory, category_catalog);
}

export async function loadComparisons(
  directory_path: string,
  concept_catalog: ConceptCatalog
): Promise<Comparison[]> {
  const files = await readContentFiles(directory_path);
  const known_ids = new Set(concept_catalog.map((concept) => concept.id));

  return files.map(({ document, file_path }) => {
    const comparison = parseComparisonDocument(document, file_path);

    comparison.concepts.forEach((concept_id, concept_index) => {
      if (!known_ids.has(concept_id)) {
        throw new ContentValidationError(file_path, [
          {
            code: "custom",
            path: ["concepts", concept_index],
            message: `La comparaison référence un concept inexistant : ${concept_id}.`
          }
        ]);
      }
    });

    return comparison;
  });
}

export async function loadContentCatalog(root_directory = process.cwd()): Promise<ContentCatalog> {
  const concepts_directory = path.join(root_directory, "content", "concepts");
  const comparisons_directory = path.join(root_directory, "content", "comparisons");
  const category_catalog = await loadCategoryCatalog(path.join(root_directory, "content", "categories.yaml"));
  const concepts = await parseConceptCatalog(concepts_directory, root_directory, category_catalog);
  const comparisons = await loadComparisons(comparisons_directory, concepts);

  return { categories: category_catalog, concepts, comparisons };
}
