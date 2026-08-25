import type { Concept, ConceptCatalog } from "@/lib/validation/schemas";

export type SearchMatchField =
  | "canonical_name"
  | "aliases"
  | "alternative_names"
  | "search.keywords"
  | "search.natural_language_queries"
  | "search.tags"
  | "short_definition"
  | "definition";

export type SearchResult = {
  concept: Concept;
  score: number;
  reason: string;
  match_field: SearchMatchField;
};

type SearchFieldRule = {
  field: SearchMatchField;
  exact_score: number;
  partial_score: number;
  reason: string;
  partial_reason: string;
};

const SEARCH_FIELD_RULES: SearchFieldRule[] = [
  {
    field: "canonical_name",
    exact_score: 1000,
    partial_score: 400,
    reason: "Nom exact",
    partial_reason: "Correspondance dans le nom"
  },
  {
    field: "aliases",
    exact_score: 900,
    partial_score: 350,
    reason: "Nom alternatif",
    partial_reason: "Correspondance dans un nom alternatif"
  },
  {
    field: "alternative_names",
    exact_score: 900,
    partial_score: 350,
    reason: "Nom alternatif",
    partial_reason: "Correspondance dans un nom alternatif"
  },
  {
    field: "search.natural_language_queries",
    exact_score: 800,
    partial_score: 300,
    reason: "Correspond à une formulation utilisateur",
    partial_reason: "Correspondance dans une formulation utilisateur"
  },
  {
    field: "search.keywords",
    exact_score: 700,
    partial_score: 250,
    reason: "Mot-clé correspondant",
    partial_reason: "Correspondance partielle dans les mots-clés"
  },
  {
    field: "search.tags",
    exact_score: 700,
    partial_score: 250,
    reason: "Mot-clé correspondant",
    partial_reason: "Correspondance partielle dans les tags"
  },
  {
    field: "short_definition",
    exact_score: 600,
    partial_score: 200,
    reason: "Correspondance dans la définition",
    partial_reason: "Correspondance partielle dans la définition"
  },
  {
    field: "definition",
    exact_score: 500,
    partial_score: 150,
    reason: "Correspondance dans la définition",
    partial_reason: "Correspondance partielle dans la définition"
  }
];

export function normalizeSearchText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function fieldValues(concept: Concept, field: SearchMatchField): string[] {
  switch (field) {
    case "canonical_name":
      return [concept.canonical_name];
    case "aliases":
      return concept.aliases ?? [];
    case "alternative_names":
      return concept.alternative_names ?? [];
    case "search.keywords":
      return concept.search.keywords;
    case "search.natural_language_queries":
      return concept.search.natural_language_queries;
    case "search.tags":
      return concept.search.tags;
    case "short_definition":
      return [concept.short_definition];
    case "definition":
      return [concept.definition];
  }
}

function hasPartialMatch(query: string, value: string): boolean {
  if (value.includes(query) || query.includes(value)) {
    return true;
  }

  const query_tokens = new Set(query.split(" ").filter((token) => token.length > 1));
  const value_tokens = new Set(value.split(" ").filter((token) => token.length > 1));

  return [...query_tokens].some((token) => value_tokens.has(token));
}

function compareResults(left: SearchResult, right: SearchResult): number {
  if (left.score !== right.score) {
    return right.score - left.score;
  }

  const left_name = normalizeSearchText(left.concept.canonical_name);
  const right_name = normalizeSearchText(right.concept.canonical_name);

  if (left_name < right_name) {
    return -1;
  }

  if (left_name > right_name) {
    return 1;
  }

  return left.concept.id < right.concept.id ? -1 : left.concept.id > right.concept.id ? 1 : 0;
}

export function searchConcepts(concepts: ConceptCatalog, query: string): SearchResult[] {
  const normalized_query = normalizeSearchText(query);

  if (normalized_query.length === 0) {
    return [];
  }

  const results: SearchResult[] = [];

  for (const concept of concepts) {
    let best_match: SearchResult | undefined;

    for (const rule of SEARCH_FIELD_RULES) {
      for (const raw_value of fieldValues(concept, rule.field)) {
        const value = normalizeSearchText(raw_value);

        if (value === normalized_query) {
          const match = {
            concept,
            score: rule.exact_score,
            reason: rule.reason,
            match_field: rule.field
          };

          if (!best_match || compareResults(match, best_match) < 0) {
            best_match = match;
          }
          continue;
        }

        if (hasPartialMatch(normalized_query, value)) {
          const match = {
            concept,
            score: rule.partial_score,
            reason: rule.partial_reason,
            match_field: rule.field
          };

          if (!best_match || compareResults(match, best_match) < 0) {
            best_match = match;
          }
        }
      }
    }

    if (best_match) {
      results.push(best_match);
    }
  }

  return results.sort(compareResults);
}
