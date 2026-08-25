import { SliceNavigation } from "@/components/navigation/SliceNavigation";

export default function ComparisonNotFound() {
  return (
    <>
      <SliceNavigation />
      <main className="comparison-page" role="alert">
        <article>
          <p className="eyebrow">404</p>
          <h1>Comparaison introuvable</h1>
          <p>La comparaison éditoriale V1 demandée n&apos;existe pas.</p>
        </article>
      </main>
    </>
  );
}