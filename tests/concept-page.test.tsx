import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ConceptPage, ContentValidationState } from "@/components/concepts/ConceptPage";
import { loadConceptBySlug } from "@/lib/content/loader";
import { ContentValidationError } from "@/lib/validation/errors";

describe("concept route data and generic rendering", () => {
  it("charge un concept existant depuis le catalogue", async () => {
    const loaded = await loadConceptBySlug("filter-chip");

    expect(loaded.concept?.id).toBe("filter-chip");
    expect(loaded.concept?.canonical_name).toBe("Filter Chip");
  });

  it("retourne un concept absent pour un slug inconnu", async () => {
    const loaded = await loadConceptBySlug("concept-inconnu");

    expect(loaded.concept).toBeUndefined();
  });

  it("rend Filter Chip avec le renderer générique et ses données", async () => {
    const loaded = await loadConceptBySlug("filter-chip");

    if (!loaded.concept) {
      throw new Error("Le concept Filter Chip attendu est absent.");
    }

    const markup = renderToStaticMarkup(
      <ConceptPage
        concept={loaded.concept}
        concepts={loaded.concepts}
        categories={loaded.categories}
      />
    );

    expect(markup).toContain("Filter Chip");
    expect(markup).toContain("Contrôle interactif compact");
    expect(markup).toContain("Un Filter Chip expose directement");
    expect(markup).toContain("Permettre un filtrage rapide");
    expect(markup).toContain("Text Only");
    expect(markup).toContain("Default");
    expect(markup).toContain("Badge");
    expect(markup).toContain("Material Design");
    expect(markup).toContain("Utilise des Filter Chips");
    expect(markup).toContain("multiple");
    expect(markup).toContain("click_or_tap");
    expect(markup).toContain("toggle_control");
  });

  it("utilise le même renderer générique pour Badge sans contenu Filter Chip", async () => {
    const loaded = await loadConceptBySlug("badge");

    if (!loaded.concept) {
      throw new Error("Le concept Badge attendu est absent.");
    }

    const markup = renderToStaticMarkup(
      <ConceptPage
        concept={loaded.concept}
        concepts={loaded.concepts}
        categories={loaded.categories}
      />
    );

    expect(markup).toContain("Badge");
    expect(markup).toContain("Un Badge est principalement");
    expect(markup).toContain("Aucune variante renseignée.");
    expect(markup).not.toContain("Filter Chip");
    expect(markup).not.toContain("Modèle de sélection");
    expect(markup).not.toContain("Modèle d'interaction");
  });

  it("affiche les erreurs de validation dans un état lisible", () => {
    const error = new ContentValidationError("filter-chip.yaml", [
      {
        code: "custom",
        path: ["status"],
        message: "Statut invalide."
      }
    ]);

    const markup = renderToStaticMarkup(<ContentValidationState error={error} />);

    expect(markup).toContain("La fiche concept ne peut pas être affichée");
    expect(markup).toContain("status");
    expect(markup).toContain("Statut invalide.");
  });
});
