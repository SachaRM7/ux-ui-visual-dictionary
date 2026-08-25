import { describe, expect, it } from "vitest";
import { loadContentCatalog } from "@/lib/content/loader";
import { normalizeSearchText, searchConcepts } from "@/lib/search/search";

async function getConcepts() {
  const catalog = await loadContentCatalog();
  return catalog.concepts;
}

describe("recherche V1 déterministe", () => {
  it("classe Filter Chip premier pour le nom exact", async () => {
    const results = searchConcepts(await getConcepts(), "filter chip");

    expect(results[0]?.concept.canonical_name).toBe("Filter Chip");
    expect(results[0]?.reason).toBe("Nom exact");
    expect(results[0]?.score).toBe(1000);
  });

  it("classe Filter Chip premier pour une formulation utilisateur", async () => {
    const results = searchConcepts(await getConcepts(), "petits boutons pour filtrer");

    expect(results[0]?.concept.canonical_name).toBe("Filter Chip");
    expect(results[0]?.reason).toBe("Correspond à une formulation utilisateur");
    expect(results[0]?.match_field).toBe("search.natural_language_queries");
  });

  it("normalise la casse, les espaces et les accents", async () => {
    const concepts = await getConcepts();
    const results = searchConcepts(concepts, "  FILTER   CHIP  ");

    expect(normalizeSearchText("  ÉTAT   Actif  ")).toBe("etat actif");
    expect(results[0]?.concept.canonical_name).toBe("Filter Chip");
    expect(results[0]?.reason).toBe("Nom exact");
  });

  it("retourne une liste vide sans résultat", async () => {
    const results = searchConcepts(await getConcepts(), "terme totalement introuvable xyz");

    expect(results).toEqual([]);
  });

  it("retrouve Badge et Tag avec leurs propres termes", async () => {
    const concepts = await getConcepts();

    expect(searchConcepts(concepts, "badge")[0]?.concept.id).toBe("badge");
    expect(searchConcepts(concepts, "classification")[0]?.concept.id).toBe("tag");
  });

  it("conserve un classement stable et sans doublons", async () => {
    const concepts = await getConcepts();
    const first = searchConcepts(concepts, "a");
    const second = searchConcepts(concepts, "a");
    const ids = first.map((result) => result.concept.id);

    expect(second.map((result) => result.concept.id)).toEqual(ids);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("reste une fonction locale synchrone sans dépendance externe", async () => {
    const result = searchConcepts(await getConcepts(), "filter chip");

    expect(result).not.toBeInstanceOf(Promise);
  });
});
