import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ConceptPage } from "@/components/concepts/ConceptPage";
import { loadContentCatalog } from "@/lib/content/loader";
import { searchConcepts } from "@/lib/search/search";

async function getCatalog() {
  return loadContentCatalog();
}

describe("catalogue Buttons du MVP élargi", () => {
  it("charge exactement huit concepts", async () => {
    const catalog = await getCatalog();

    expect(catalog.concepts.map((concept) => concept.id)).toEqual([
      "badge",
      "button",
      "filter-chip",
      "ghost-button",
      "icon-button",
      "primary-button",
      "secondary-button",
      "tag"
    ]);
  });

  it("résout Button comme parent des quatre concepts enfants", async () => {
    const catalog = await getCatalog();
    const children = ["primary-button", "secondary-button", "ghost-button", "icon-button"];

    for (const child_id of children) {
      expect(catalog.concepts.find((concept) => concept.id === child_id)?.relationships.parent).toEqual([
        "button"
      ]);
    }
  });

  it("ne contient aucune relation vers une cible inexistante", async () => {
    const catalog = await getCatalog();
    const known_ids = new Set(catalog.concepts.map((concept) => concept.id));

    for (const concept of catalog.concepts) {
      for (const relation_ids of Object.values(concept.relationships)) {
        expect(relation_ids.every((relation_id) => known_ids.has(relation_id))).toBe(true);
      }
    }
  });

  it.each([
    ["button", "button"],
    ["bouton principal", "primary-button"],
    ["bouton secondaire", "secondary-button"],
    ["bouton discret sans fond", "ghost-button"],
    ["bouton avec seulement une icône", "icon-button"]
  ] as const)("retrouve %s avec le concept attendu en premier", async (query, expected_id) => {
    const results = searchConcepts((await getCatalog()).concepts, query);

    expect(results[0]?.concept.id).toBe(expected_id);
  });

  it("rend un concept Button enfant avec le renderer générique", async () => {
    const catalog = await getCatalog();
    const concept = catalog.concepts.find((candidate) => candidate.id === "primary-button");

    if (!concept) {
      throw new Error("Primary Button attendu absent du catalogue.");
    }

    const markup = renderToStaticMarkup(
      <ConceptPage concept={concept} concepts={catalog.concepts} categories={catalog.categories} />
    );

    expect(markup).toContain("Primary Button");
    expect(markup).toContain("Un Primary Button est une variante");
    expect(markup).toContain("Modèle de sélection");
    expect(markup).toContain("W3C");
  });

  it("ne régressionne pas les trois concepts du Vertical Slice V1", async () => {
    const concepts = (await getCatalog()).concepts;

    expect(searchConcepts(concepts, "filter chip")[0]?.concept.id).toBe("filter-chip");
    expect(searchConcepts(concepts, "badge")[0]?.concept.id).toBe("badge");
    expect(searchConcepts(concepts, "tag")[0]?.concept.id).toBe("tag");
  });
});