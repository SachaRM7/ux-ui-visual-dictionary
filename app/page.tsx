import React from "react";
import Link from "next/link";
import { SliceNavigation } from "@/components/navigation/SliceNavigation";

const EXAMPLE_QUERY = "petits boutons pour filtrer";

export default function HomePage() {
  return (
    <>
      <SliceNavigation />
      <main className="home-page">
        <section className="home-hero">
          <p className="eyebrow">Encyclopédie UI/UX</p>
          <h1>Trouvez le bon concept pour votre interface.</h1>
          <p className="home-introduction">
            Décrivez ce que vous voulez faire ou cherchez un terme UX/UI pour
            comprendre son rôle, son usage et les concepts proches.
          </p>

          <form action="/search" method="get" className="search-form home-search-form">
            <label htmlFor="home-search-query">Décrivez votre intention</label>
            <div>
              <input
                id="home-search-query"
                name="q"
                type="search"
                placeholder="Ex. petits boutons pour filtrer"
              />
              <button type="submit">Rechercher</button>
            </div>
          </form>

          <p className="home-example">
            <span>Exemple :</span>{" "}
            <Link href={"/search?q=" + encodeURIComponent(EXAMPLE_QUERY)}>
              {EXAMPLE_QUERY}
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}