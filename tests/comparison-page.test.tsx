import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ComparisonPage } from "@/components/comparisons/ComparisonPage";
import { loadComparisonById } from "@/lib/content/loader";
import { ContentValidationError } from "@/lib/validation/errors";

async function createComparisonFixture() {
  const temporary_root = await mkdtemp(path.join(os.tmpdir(), "ux-ui-comparison-"));
  await cp(path.join(process.cwd(), "content"), path.join(temporary_root, "content"), { recursive: true });
  return temporary_root;
}

async function expectComparisonRejection(findText: string, replacement: string) {
  const temporary_root = await createComparisonFixture();
  const file_path = path.join(
    temporary_root,
    "content",
    "comparisons",
    "filter-chip-vs-badge-vs-tag.yaml"
  );
  const source = await readFile(file_path, "utf8");
  await writeFile(file_path, source.replace(findText, replacement), "utf8");

  try {
    await expect(
      loadComparisonById("filter-chip-vs-badge-vs-tag", temporary_root)
    ).rejects.toBeInstanceOf(ContentValidationError);
  } finally {
    await rm(temporary_root, { recursive: true, force: true });
  }
}

describe("comparaison éditoriale V1", () => {
  it("charge la comparaison V1 avec exactement les trois concepts et six critères", async () => {
    const loaded = await loadComparisonById("filter-chip-vs-badge-vs-tag");

    expect(loaded.comparison?.concepts).toEqual(["filter-chip", "badge", "tag"]);
    expect(Object.keys(loaded.comparison?.criteria ?? {})).toEqual([
      "function",
      "interaction",
      "selection",
      "role",
      "context",
      "use_case"
    ]);
  });

  it("rend les noms, définitions et valeurs issus des données", async () => {
    const loaded = await loadComparisonById("filter-chip-vs-badge-vs-tag");

    if (!loaded.comparison) {
      throw new Error("La comparaison V1 attendue est absente.");
    }

    const custom_text = "Valeur éditoriale injectée par les données.";
    const comparison = {
      ...loaded.comparison,
      criteria: {
        ...loaded.comparison.criteria,
        function: {
          ...loaded.comparison.criteria.function,
          "filter-chip": custom_text
        }
      }
    };

    const markup = renderToStaticMarkup(
      <ComparisonPage comparison={comparison} concepts={loaded.concepts} />
    );

    expect(markup).toContain("Filter Chip");
    expect(markup).toContain("Badge");
    expect(markup).toContain("Tag");
    expect(markup).toContain("Contrôle interactif compact");
    expect(markup).toContain("Élément compact présentant une information");
    expect(markup).toContain("Valeur éditoriale injectée par les données.");
    expect(markup).toContain("Function");
    expect(markup).toContain("Use case");
    expect(ComparisonPage.toString()).not.toContain("Filter Chip");
  });

  it("produit une structure lisible sans dépendre d'un tableau horizontal", async () => {
    const loaded = await loadComparisonById("filter-chip-vs-badge-vs-tag");

    if (!loaded.comparison) {
      throw new Error("La comparaison V1 attendue est absente.");
    }

    const markup = renderToStaticMarkup(
      <ComparisonPage comparison={loaded.comparison} concepts={loaded.concepts} />
    );

    expect(markup).toContain('class="comparison-concepts"');
    expect(markup).toContain('class="comparison-criteria"');
    expect(markup).toContain('class="comparison-values"');
    expect(markup).not.toContain("<table");
  });

  it("retourne une comparaison absente pour un identifiant inconnu", async () => {
    const loaded = await loadComparisonById("comparison-inconnue");

    expect(loaded.comparison).toBeUndefined();
  });

  it("rejette une référence de concept inexistante", async () => {
    await expectComparisonRejection("  - tag\n", "  - concept-inconnu\n");
  });

  it("rejette une comparaison incomplète selon Zod", async () => {
    await expectComparisonRejection(
      "    tag: Classifier ou décrire principalement un contenu.\n",
      ""
    );
  });
});
