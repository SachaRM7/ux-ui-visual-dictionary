import { SliceNavigation } from "@/components/navigation/SliceNavigation";

export default function ConceptNotFound() {
  return (
    <>
      <SliceNavigation />
      <main className="concept-page" role="alert">
        <article>
          <p className="eyebrow">404</p>
          <h1>Concept introuvable</h1>
          <p>Le slug demandé ne correspond à aucun concept du catalogue V1.</p>
        </article>
      </main>
    </>
  );
}