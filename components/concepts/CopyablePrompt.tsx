"use client";

import { useState } from "react";

type ClipboardWriter = Pick<Clipboard, "writeText">;

export type CopyPromptResult =
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function getBrowserClipboard(): ClipboardWriter | undefined {
  if (typeof navigator === "undefined") {
    return undefined;
  }

  return navigator.clipboard;
}

export async function copyPromptText(
  prompt: string,
  clipboard: ClipboardWriter | undefined = getBrowserClipboard()
): Promise<CopyPromptResult> {
  if (!clipboard) {
    return {
      status: "error",
      message: "La copie n'est pas disponible dans ce navigateur."
    };
  }

  try {
    await clipboard.writeText(prompt);
    return { status: "success", message: "Prompt copié." };
  } catch {
    return {
      status: "error",
      message: "Impossible de copier le prompt. Vérifiez les permissions du navigateur."
    };
  }
}

export function CopyablePrompt({ label, prompt }: { label: string; prompt: string }) {
  const [feedback, setFeedback] = useState<CopyPromptResult | null>(null);
  const [isCopying, setIsCopying] = useState(false);

  async function handleCopy() {
    setIsCopying(true);
    const result = await copyPromptText(prompt);
    setFeedback(result);
    setIsCopying(false);
  }

  return (
    <div className="prompt-block">
      <h3>{label}</h3>
      <pre>{prompt || "Aucun prompt renseigné."}</pre>
      <button
        type="button"
        className="prompt-copy-button"
        onClick={handleCopy}
        disabled={isCopying}
        aria-label={"Copier " + label.toLocaleLowerCase()}
      >
        {isCopying ? "Copie…" : "Copier"}
      </button>
      {feedback ? (
        <p className="prompt-copy-feedback" role="status" aria-live="polite">
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
}