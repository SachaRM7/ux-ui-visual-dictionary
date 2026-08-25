import Link from "next/link";

export function SliceNavigation() {
  return (
    <nav className="slice-navigation" aria-label="Navigation principale">
      <Link href="/" className="slice-navigation-brand">
        UI/UX Visual Dictionary
      </Link>
      <div className="slice-navigation-links">
        <Link href="/search">Recherche</Link>
        <Link href="/compare/filter-chip-badge-tag">Comparaison V1</Link>
      </div>
    </nav>
  );
}