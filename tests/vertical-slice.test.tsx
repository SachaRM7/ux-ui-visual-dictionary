import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import SearchPage from "@/app/search/page";
import { ComparisonPage } from "@/components/comparisons/ComparisonPage";
import { ConceptPage } from "@/components/concepts/ConceptPage";
import { loadComparisonById, loadConceptBySlug } from "@/lib/content/loader";

const EXAMPLE_QUERY = "petits boutons pour filtrer";

describe("parcours complet du Vertical Slice V1", () => {
  it("rend une homepage avec proposition de valeur et formulaire de recherche", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain('<main class="home-page">');
    expect(markup).toContain("Trouvez le bon concept pour votre interface.");
    expect(markup).toContain('action="/search"');
    expect(markup).toContain('method="get"');
    expect(markup).toContain('name="q"');
    expect(markup).toContain('for="home-search-query"');
    expect(markup).toContain("petits boutons pour filtrer");
    expect(markup).toContain(
      '/search?q=petits%20boutons%20pour%20filtrer'
    );
  });

  it("relie la recherche intentionnelle au premier résultat Filter Chip", async () => {
    const page = await SearchPage({
      searchParams: Promise.resolve({ q: EXAMPLE_QUERY })
    });
    const markup = renderToStaticMarkup(page);

    expect(markup.indexOf('href="/concepts/filter-chip"')).toBeGreaterThan(-1);
    expect(markup).toContain("Filter Chip");
    expect(markup).toContain("Correspond à une formulation utilisateur");
    expect(markup.indexOf('href="/concepts/filter-chip"')).toBeLessThan(
      markup.indexOf('href="/concepts/badge"') === -1
        ? Number.POSITIVE_INFINITY
        : markup.indexOf('href="/concepts/badge"')
    );
  });

  it("dérive le lien concept vers comparaison depuis les données", async () => {
    const loaded = await loadConceptBySlug("filter-chip");
    const badge = await loadConceptBySlug("badge");

    if (!loaded.concept || !badge.concept) {
      throw new Error("Les concepts V1 attendus sont absents.");
    }

    expect(loaded.comparisons.map((comparison) => comparison.id)).toEqual([
      "filter-chip-vs-badge-vs-tag"
    ]);
    expect(badge.comparisons.map((comparison) => comparison.id)).toEqual([
      "filter-chip-vs-badge-vs-tag"
    ]);

    const markup = renderToStaticMarkup(
      <ConceptPage
        concept={loaded.concept}
        concepts={loaded.concepts}
        categories={loaded.categories}
        comparisons={loaded.comparisons}
      />
    );

    expect(markup).toContain('href="/compare/filter-chip-badge-tag"');
    expect(markup).toContain("Filter Chip / Badge / Tag");
    expect(ConceptPage.toString()).not.toContain("filter-chip");
  });

  it("relie la comparaison aux trois fiches concept", async () => {
    const loaded = await loadComparisonById("filter-chip-vs-badge-vs-tag");

    if (!loaded.comparison) {
      throw new Error("La comparaison V1 attendue est absente.");
    }

    const markup = renderToStaticMarkup(
      <ComparisonPage comparison={loaded.comparison} concepts={loaded.concepts} />
    );

    expect(markup).toContain('href="/concepts/filter-chip"');
    expect(markup).toContain('href="/concepts/badge"');
    expect(markup).toContain('href="/concepts/tag"');
  });

  it("conserve les landmarks, labels, retours de recherche et prompts copiables", async () => {
    const home_markup = renderToStaticMarkup(<HomePage />);
    const search_page = await SearchPage({
      searchParams: Promise.resolve({ q: EXAMPLE_QUERY })
    });
    const search_markup = renderToStaticMarkup(search_page);
    const loaded = await loadConceptBySlug("filter-chip");

    if (!loaded.concept) {
      throw new Error("Le concept Filter Chip attendu est absent.");
    }

    const concept_markup = renderToStaticMarkup(
      <ConceptPage
        concept={loaded.concept}
        concepts={loaded.concepts}
        categories={loaded.categories}
        comparisons={loaded.comparisons}
      />
    );

    expect(home_markup).toContain('aria-label="Navigation principale"');
    expect(search_markup).toContain('aria-live="polite"');
    expect(search_markup).toContain('for="search-query"');
    expect(concept_markup).toContain('aria-label="Copier prompt court"');
    expect(concept_markup).toContain('aria-label="Copier prompt détaillé"');
    expect(concept_markup).toContain('href="/compare/filter-chip-badge-tag"');
  });
});