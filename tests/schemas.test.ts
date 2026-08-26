import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { describe, expect, it } from "vitest";
import {
  ComparisonSchema,
  ConceptCatalogSchema,
  ConceptSchema
} from "@/lib/validation/schemas";
import {
  loadContentCatalog,
  parseConceptDocument
} from "@/lib/content/loader";
import { ContentValidationError } from "@/lib/validation/errors";

async function create_catalog_fixture() {
  const temporary_root = await mkdtemp(path.join(os.tmpdir(), "ux-ui-visual-dictionary-"));
  await cp(path.join(process.cwd(), "content"), path.join(temporary_root, "content"), { recursive: true });
  return temporary_root;
}

async function expect_catalog_rejection(
  relative_path: string,
  find_text: string,
  replacement: string
) {
  const temporary_root = await create_catalog_fixture();
  const file_path = path.join(temporary_root, relative_path);
  const source = await readFile(file_path, "utf8");
  await writeFile(file_path, source.replace(find_text, replacement), "utf8");

  try {
    await expect(loadContentCatalog(temporary_root)).rejects.toBeInstanceOf(ContentValidationError);
  } finally {
    await rm(temporary_root, { recursive: true, force: true });
  }
}

function make_valid_concept(overrides: Record<string, unknown> = {}) {
  return {
    id: "sample-concept",
    canonical_name: "Sample Concept",
    slug: "sample-concept",
    status: "pilot",
    interactive: false,
    category: {
      primary: "sample-primary",
      secondary: "sample-secondary",
      tertiary: "sample-tertiary"
    },
    short_definition: "A short definition.",
    definition: "A complete definition.",
    purpose: "A stated purpose.",
    use_when: [],
    avoid_when: [],
    variants: [],
    states: [],
    relationships: {
      parent: [],
      commonly_confused_with: [],
      alternatives_to: [],
      related_patterns: []
    },
    visuals: { isolated: null },
    sources: [],
    search: {
      keywords: ["sample concept"],
      natural_language_queries: [],
      tags: []
    },
    ai: {
      short_prompt: "",
      detailed_prompt: ""
    },
    ...overrides
  };
}

describe("ConceptSchema", () => {
  it("accepte un concept pilote valide", () => {
    expect(ConceptSchema.safeParse(make_valid_concept()).success).toBe(true);
  });

  it("refuse un id qui ne respecte pas le kebab-case", () => {
    const result = ConceptSchema.safeParse(make_valid_concept({ id: "SampleConcept" }));

    expect(result.success).toBe(false);
  });

  it("exige les blocs spécifiques aux concepts interactifs", () => {
    const result = ConceptSchema.safeParse(make_valid_concept({ interactive: true }));

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.path.join(".")).sort()).toEqual([
        "accessibility",
        "interaction_model",
        "selection_model"
      ]);
    }
  });

  it("refuse une publication sans visuel ni source", () => {
    const result = ConceptSchema.safeParse(
      make_valid_concept({ status: "published", use_when: ["Use it"], avoid_when: ["Avoid it"] })
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.join(".") === "visuals.isolated")).toBe(true);
      expect(result.error.issues.some((issue) => issue.path.join(".") === "sources")).toBe(true);
    }
  });
});

describe("ConceptCatalogSchema", () => {
  it("refuse une relation vers un concept inexistant", () => {
    const result = ConceptCatalogSchema.safeParse([
      make_valid_concept({
        relationships: {
          parent: [],
          commonly_confused_with: ["missing-concept"],
          alternatives_to: [],
          related_patterns: []
        }
      })
    ]);

    expect(result.success).toBe(false);
  });

  it("refuse deux noms canoniques identiques après normalisation", () => {
    const result = ConceptCatalogSchema.safeParse([
      make_valid_concept(),
      make_valid_concept({
        id: "other-concept",
        canonical_name: " sample   concept ",
        slug: "other-concept"
      })
    ]);

    expect(result.success).toBe(false);
  });

  it("refuse un alias identique au nom canonique d'un autre concept", () => {
    const result = ConceptCatalogSchema.safeParse([
      make_valid_concept({ aliases: ["Other Concept"] }),
      make_valid_concept({
        id: "other-concept",
        canonical_name: "Other Concept",
        slug: "other-concept"
      })
    ]);

    expect(result.success).toBe(false);
  });

  it("refuse un alias partagé entre plusieurs concepts", () => {
    const result = ConceptCatalogSchema.safeParse([
      make_valid_concept({ aliases: ["Shared term"] }),
      make_valid_concept({
        id: "other-concept",
        slug: "other-concept",
        aliases: [" shared   term "]
      })
    ]);

    expect(result.success).toBe(false);
  });

  it("refuse un nom alternatif identique au nom canonique d'un autre concept", () => {
    const result = ConceptCatalogSchema.safeParse([
      make_valid_concept({ alternative_names: ["Other Concept"] }),
      make_valid_concept({
        id: "other-concept",
        canonical_name: "Other Concept",
        slug: "other-concept"
      })
    ]);

    expect(result.success).toBe(false);
  });
});

describe("ComparisonSchema", () => {
  it("exige une valeur pour chaque concept et chaque critère", () => {
    const result = ComparisonSchema.safeParse({
      id: "sample-comparison",
      concepts: ["sample-concept", "other-concept"],
      criteria: {
        function: { "sample-concept": "A function" },
        interaction: { "sample-concept": "An interaction", "other-concept": "Another interaction" },
        selection: { "sample-concept": "A selection", "other-concept": "Another selection" },
        role: { "sample-concept": "A role", "other-concept": "Another role" },
        context: { "sample-concept": "A context", "other-concept": "Another context" },
        use_case: { "sample-concept": "A use case", "other-concept": "Another use case" }
      }
    });

    expect(result.success).toBe(false);
  });
});

describe("content loader", () => {
  it("parse et valide un document YAML sans fichier métier", () => {
    const document = parseYaml(`
id: sample-concept
canonical_name: Sample Concept
slug: sample-concept
status: pilot
interactive: false
category:
  primary: sample-primary
  secondary: sample-secondary
  tertiary: sample-tertiary
short_definition: A short definition.
definition: A complete definition.
purpose: A stated purpose.
use_when: []
avoid_when: []
variants: []
states: []
relationships:
  parent: []
  commonly_confused_with: []
  alternatives_to: []
  related_patterns: []
visuals:
  isolated: null
sources: []
search:
  keywords:
    - sample concept
  natural_language_queries: []
  tags: []
ai:
  short_prompt: ''
  detailed_prompt: ''
`);

    expect(parseConceptDocument(document, "sample-concept.yaml").id).toBe("sample-concept");
  });

  it("charge et valide le catalogue V1 complet", async () => {
    const catalog = await loadContentCatalog(process.cwd());

    expect(catalog.concepts.map((concept) => concept.id)).toEqual(["badge", "button", "filter-chip", "ghost-button", "icon-button", "primary-button", "secondary-button", "tag"]);
    expect(catalog.concepts.map((concept) => concept.id)).toHaveLength(new Set(catalog.concepts.map((concept) => concept.id)).size);
    expect(catalog.comparisons).toHaveLength(1);
    expect(catalog.comparisons[0]?.concepts).toEqual(["filter-chip", "badge", "tag"]);
    expect(catalog.categories.primary).toHaveLength(1);
    expect(catalog.categories.primary[0]?.secondary.map((secondary) => secondary.id)).toContain("actions");
  });

  it("refuse une relation vers un concept inexistant au chargement", async () => {
    await expect_catalog_rejection(
      "content/concepts/filter-chip.yaml",
      "    - badge\n",
      "    - missing-concept\n"
    );
  });

  it("refuse une catégorie absente de la taxonomie contrôlée", async () => {
    await expect_catalog_rejection(
      "content/concepts/badge.yaml",
      "  tertiary: badges\n",
      "  tertiary: unknown-category\n"
    );
  });

  it("refuse une comparaison vers un concept inexistant", async () => {
    await expect_catalog_rejection(
      "content/comparisons/filter-chip-vs-badge-vs-tag.yaml",
      "  - tag\n",
      "  - missing-concept\n"
    );
  });

  it("refuse une comparaison incomplète", async () => {
    await expect_catalog_rejection(
      "content/comparisons/filter-chip-vs-badge-vs-tag.yaml",
      "    tag: Classifier ou décrire principalement un contenu.\n",
      ""
    );
  });

  it("valide les décisions comportementales du Filter Chip pilote", async () => {
    const catalog = await loadContentCatalog(process.cwd());
    const filter_chip = catalog.concepts.find((concept) => concept.id === "filter-chip");

    expect(filter_chip).toBeDefined();
    expect(filter_chip?.status).toBe("pilot");
    expect(filter_chip?.interactive).toBe(true);
    expect(filter_chip?.aliases).toEqual([]);
    expect(filter_chip?.alternative_names).toEqual(["Filter Pill"]);
    expect(filter_chip?.relationships.commonly_confused_with).toEqual(["badge", "tag"]);
    expect(filter_chip?.selection_model).toEqual({ type: "multiple", min_selection: 0, max_selection: null });
    expect(filter_chip?.interaction_model).toEqual({
      trigger: "click_or_tap",
      activation: "toggle",
      deactivation: "toggle",
      immediate_effect: true,
      requires_confirmation: false
    });
    expect(filter_chip?.search.natural_language_queries).toContain("petits boutons pour filtrer");
  });
});
