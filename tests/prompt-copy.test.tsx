import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { CopyablePrompt, copyPromptText } from "@/components/concepts/CopyablePrompt";
import { loadConceptBySlug } from "@/lib/content/loader";

describe("prompts statiques copiables", () => {
  it("affiche les prompts court et détaillé depuis les données du concept", async () => {
    const loaded = await loadConceptBySlug("filter-chip");

    if (!loaded.concept) {
      throw new Error("Le concept Filter Chip attendu est absent.");
    }

    const markup = renderToStaticMarkup(
      <>
        <CopyablePrompt label="Prompt court" prompt={loaded.concept.ai.short_prompt} />
        <CopyablePrompt label="Prompt détaillé" prompt={loaded.concept.ai.detailed_prompt} />
      </>
    );

    expect(markup).toContain("Prompt court");
    expect(markup).toContain(loaded.concept.ai.short_prompt.replaceAll("'", "&#x27;"));
    expect(markup).toContain("Prompt détaillé");
    expect(markup).toContain(loaded.concept.ai.detailed_prompt.replaceAll("'", "&#x27;"));
    expect(markup).toContain('aria-label="Copier prompt court"');
    expect(markup).toContain('aria-label="Copier prompt détaillé"');
  });

  it("copie exactement le prompt court", async () => {
    const prompt = "Prompt court exact.";
    const writeText = vi.fn().mockResolvedValue(undefined);

    const result = await copyPromptText(prompt, { writeText });

    expect(writeText).toHaveBeenCalledOnce();
    expect(writeText).toHaveBeenCalledWith(prompt);
    expect(result).toEqual({ status: "success", message: "Prompt copié." });
  });

  it("copie exactement le prompt détaillé", async () => {
    const prompt = "Prompt détaillé exact avec plusieurs lignes.\nDeuxième ligne.";
    const writeText = vi.fn().mockResolvedValue(undefined);

    const result = await copyPromptText(prompt, { writeText });

    expect(writeText).toHaveBeenCalledWith(prompt);
    expect(result.status).toBe("success");
  });

  it("retourne un feedback de succès après la copie", async () => {
    const result = await copyPromptText("Prompt à copier", {
      writeText: vi.fn().mockResolvedValue(undefined)
    });

    expect(result.message).toBe("Prompt copié.");
  });

  it("retourne un feedback compréhensible en cas d'échec Clipboard", async () => {
    const result = await copyPromptText("Prompt impossible", {
      writeText: vi.fn().mockRejectedValue(new Error("Clipboard refusé"))
    });

    expect(result.status).toBe("error");
    expect(result.message).toContain("Impossible de copier");
  });

  it("signale l'absence de Clipboard sans appeler de réseau ni d'IA", async () => {
    const fetch_mock = vi.fn();
    vi.stubGlobal("fetch", fetch_mock);

    try {
      const result = await copyPromptText("Prompt sans Clipboard", undefined);

      expect(result.status).toBe("error");
      expect(result.message).toContain("copie n'est pas disponible");
      expect(fetch_mock).not.toHaveBeenCalled();
      expect(CopyablePrompt.toString()).not.toContain("filter-chip");
      expect(CopyablePrompt.toString()).not.toContain("fetch");
    } finally {
      vi.unstubAllGlobals();
    }
  });
});