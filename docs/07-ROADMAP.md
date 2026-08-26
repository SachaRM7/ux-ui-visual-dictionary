# 07 — Roadmap

## 1. Objectif

Ce document définit l'ordre de construction du projet.

Il distingue deux niveaux :

1. **Vertical Slice V1** — première preuve fonctionnelle ;
2. **MVP élargi** — première bibliothèque réellement plus large.

Le Vertical Slice doit être terminé et validé avant d'étendre le produit à 20–30 concepts.

---

# 2. Vertical Slice V1

Le premier développement couvre uniquement trois concepts :

```text
filter-chip
badge
tag
```

Le parcours à valider est :

```text
Homepage
→ Search Results
→ Filter Chip
→ Concept Detail
→ Comparison Filter Chip / Badge / Tag
→ Static AI Prompt
```

Seul Filter Chip nécessite une fiche éditoriale complète.

Badge et Tag doivent seulement disposer des données minimales nécessaires :

- à leur identité ;
- aux relations ;
- à la recherche si nécessaire ;
- à la comparaison.

`Chip` n'est pas un Concept du catalogue V1.

---

# 3. Hypothèse à valider

Le Vertical Slice doit répondre à cette question :

> Une personne qui ne connaît pas le vocabulaire UI/UX peut-elle décrire une intention vague, retrouver le bon concept, comprendre pourquoi il correspond, le distinguer de notions proches et copier une instruction précise pour une IA ?

Si cette chaîne fonctionne avec Filter Chip, Badge et Tag, le projet peut être élargi.

---

# 4. Fonctionnalités incluses dans le Vertical Slice

## Homepage

Contient :

- proposition de valeur courte ;
- champ de recherche central ;
- exemple `petits boutons pour filtrer` ;
- action de recherche.

La homepage V1 n'est pas une bibliothèque exhaustive.

## Search Results

Contient :

- requête ;
- résultats ;
- nom du concept ;
- catégorie ;
- définition courte ;
- raison de correspondance.

Filter Chip doit être classé premier pour :

```text
petits boutons pour filtrer
```

## Concept Detail — Filter Chip

Contient au minimum :

- nom ;
- catégorie ;
- définition ;
- fonction UX ;
- visuel isolé ;
- quand utiliser ;
- quand éviter ;
- variantes ;
- états ;
- concepts associés ;
- à ne pas confondre avec ;
- sources ;
- prompt court ;
- prompt détaillé.

## Comparison

Comparaison unique V1 :

```text
Filter Chip
vs
Badge
vs
Tag
```

Critères :

- function ;
- interaction ;
- selection ;
- role ;
- context ;
- use_case.

La comparaison est éditoriale et statique.

## Prompt

Pas de page autonome obligatoire.

La fiche Filter Chip doit permettre :

- d'afficher le prompt court ;
- d'afficher le prompt détaillé ;
- de copier le prompt.

Aucun appel à une IA n'est effectué.

---

# 5. Données du Vertical Slice

Le contrat officiel est :

`09-CONTRAT-DONNEES-V1.md`

Les fichiers initiaux sont :

```text
content/
  concepts/
    filter-chip.yaml
    badge.yaml
    tag.yaml

  comparisons/
    filter-chip-vs-badge-vs-tag.yaml
```

`03-SCHEMA-DES-FICHES.md` reste le modèle conceptuel complet mais ne doit pas élargir l'implémentation V1.

---

# 6. Filter Chip pilote

Le comportement officiel du prototype est :

```yaml
interactive: true

selection_model:
  type: multiple
  min_selection: 0
  max_selection: null

interaction_model:
  trigger: click_or_tap
  activation: toggle
  deactivation: toggle
  immediate_effect: true
  requires_confirmation: false
```

Donc :

- plusieurs Filter Chips peuvent être actifs ;
- un clic ou tap inverse leur état ;
- la mise à jour est immédiate ;
- aucun bouton Apply n'est utilisé dans le pilote V1.

La fiche peut expliquer d'autres architectures, mais elles ne font pas partie du comportement de démonstration.

---

# 7. Recherche V1

La recherche est déterministe.

Elle indexe les champs définis par `09-CONTRAT-DONNEES-V1.md`, notamment :

- `canonical_name`
- `aliases`
- `alternative_names`
- `search.keywords`
- `search.natural_language_queries`
- `search.tags`
- `short_definition`
- `definition`

Normalisation minimale :

- trim ;
- minuscules ;
- espaces multiples ;
- comparaison insensible à la casse.

Une normalisation simple des accents peut être ajoutée.

Pas de :

- embeddings ;
- semantic search ;
- vector database ;
- modèle IA ;
- fuzzy engine avancé.

---

# 8. Comparaison V1

Une seule comparaison est nécessaire :

```text
filter-chip
badge
tag
```

Elle est stockée comme contenu éditorial structuré.

Il n'est pas nécessaire de créer :

- un moteur automatique ;
- une génération IA ;
- un comparateur arbitraire de 2 à 4 concepts.

Ces capacités appartiennent au MVP élargi ou à une version ultérieure.

---

# 9. Prompts V1

Chaque fiche publiée doit pouvoir fournir :

```yaml
ai:
  short_prompt:
  detailed_prompt:
```

Dans le Vertical Slice :

- prompts statiques ;
- contenu déterministe ;
- stockage dans les données ;
- affichage ;
- copie.

Pas de Prompt Builder complet.

Pas d'assemblage multi-concepts.

Pas d'appel à un modèle IA.

---

# 10. Visuels V1

Minimum pour une fiche `published` :

```text
1 visuel pédagogique isolé
```

Pour Filter Chip, l'asset peut être absent tant que la fiche reste :

```text
pilot
```

Le passage à `published` exige un asset réel.

Hors Vertical Slice :

- screenshots réels ;
- visuels contextualisés ;
- animations ;
- Do / Don't ;
- bibliothèque visuelle complète.

---

# 11. Sources V1

Les sources suivent :

- `04-SOURCING-ET-DROITS.md`
- `09-CONTRAT-DONNEES-V1.md`

Convention de vérification :

```text
last_verified
```

Une fiche `published` doit avoir des sources structurées et suffisamment renseignées selon le contrat V1.

---

# 12. Phase 0 — Documentation

Avant le code :

- vision produit définie ;
- contrat V1 défini ;
- UX V1 définie ;
- architecture V1 définie ;
- fiche pilote Filter Chip alignée ;
- règles agents alignées.

Documents structurants :

```text
01-VISION-PRODUIT.md
02-TAXONOMIE-UI-UX.md
03-SCHEMA-DES-FICHES.md
04-SOURCING-ET-DROITS.md
05-UX-DU-PRODUIT.md
06-ARCHITECTURE-TECHNIQUE.md
07-ROADMAP.md
08-FICHE-MODELE-FILTER-CHIP.md
09-CONTRAT-DONNEES-V1.md
AGENTS.md
README.md
```

---

# 13. Phase 1 — Socle applicatif

Créer uniquement le socle nécessaire :

- projet Next.js + TypeScript ;
- structure des dossiers ;
- validation Zod ;
- chargement des contenus ;
- tests de validation ;
- layout minimal.

Ne pas encore construire toute l'interface produit.

Critère de sortie :

> un concept valide peut être chargé et validé, et un contenu invalide échoue clairement.

---

# 14. Phase 2 — Données du catalogue V1

Créer :

1. `filter-chip`
2. `badge`
3. `tag`
4. la comparaison `filter-chip / badge / tag`

Filter Chip est complet selon le contrat V1.

Badge et Tag sont minimaux.

Ne pas ajouter à cette phase :

- Bottom Sheet ;
- Modal ;
- Button ;
- Chip générique ;
- autres concepts.

Critère de sortie :

> les trois concepts et la comparaison passent la validation.

---

# 15. Phase 3 — Rendu générique

Construire :

- Homepage ;
- Search Results ;
- Concept Page générique ;
- Comparison Page.

La page Filter Chip doit être rendue par le même mécanisme générique qui pourra plus tard afficher d'autres concepts.

Critère de sortie :

> Filter Chip est visible depuis ses données structurées, sans contenu métier codé en dur dans la page.

---

# 16. Phase 4 — Recherche

Implémenter la recherche V1.

Scénarios obligatoires :

## Terme connu

```text
filter chip
```

Résultat principal :

```text
Filter Chip
```

## Intention vague

```text
petits boutons pour filtrer
```

Résultat principal :

```text
Filter Chip
```

## Aucun résultat

La page affiche un état vide compréhensible.

Critère de sortie :

> la recherche fonctionne sans IA et explique la correspondance.

---

# 17. Phase 5 — Comparaison

Implémenter la comparaison statique :

```text
Filter Chip / Badge / Tag
```

Vérifier les six critères V1.

Critère de sortie :

> l'utilisateur comprend que Filter Chip est un contrôle de filtrage, Badge principalement une information/statut et Tag principalement une classification/description.

---

# 18. Phase 6 — Prompt statique

Afficher dans la fiche :

- prompt court ;
- prompt détaillé ;
- bouton de copie.

Critère de sortie :

> l'utilisateur peut copier le prompt sans qu'aucun service IA soit appelé.

---

# 19. Phase 7 — Accessibilité, responsive et finition V1

Vérifier :

- navigation clavier ;
- focus visible ;
- noms accessibles ;
- structure de titres ;
- mobile ;
- tablette ;
- desktop ;
- comparaison lisible sur petit écran ;
- états erreur / chargement / aucun résultat lorsque pertinents.

---

# 20. Definition of Done — Vertical Slice

Le Vertical Slice est terminé lorsque :

- les trois concepts V1 sont valides ;
- Filter Chip possède une fiche complète ;
- Badge et Tag alimentent correctement la comparaison ;
- la recherche exacte fonctionne ;
- la recherche `petits boutons pour filtrer` fonctionne ;
- Filter Chip est classé premier ;
- la raison de correspondance est affichée ;
- la fiche Filter Chip est rendue depuis les données ;
- le visuel isolé est affichable ou la fiche reste explicitement `pilot` ;
- la comparaison Filter Chip / Badge / Tag fonctionne ;
- les prompts statiques sont affichés et copiables ;
- aucun appel IA n'existe ;
- aucune base distante n'est nécessaire ;
- lint, typecheck, tests et build passent lorsque configurés.

---

# 21. Hors scope du Vertical Slice

Explicitement hors scope :

- bibliothèque de 20–30 concepts ;
- Bottom Sheet ;
- Modal ;
- Button ;
- Chip générique comme fiche V1 ;
- navigation exhaustive par catégories ;
- recommandations automatiques ;
- fuzzy search avancée ;
- semantic search ;
- embeddings ;
- vector database ;
- IA générative ;
- Prompt Builder ;
- assemblage multi-concepts ;
- comptes ;
- favoris ;
- collections ;
- communauté ;
- base distante ;
- screenshots externes ;
- exemples de produits réels ;
- visuels contextualisés ;
- animations avancées ;
- recherche par image ;
- extension navigateur ;
- plugin Figma ;
- génération de composants ;
- internationalisation complète ;
- analytics avancées.

---

# 22. MVP élargi

Une fois le Vertical Slice validé, étendre progressivement le catalogue à environ :

```text
20–30 concepts
```

À ce moment seulement, introduire de nouveaux groupes.

Exemples possibles :

## Actions

- Button
- Primary Button
- Secondary Button
- Ghost Button
- Destructive Button
- Icon Button

## Chips / Tags / Badges

- Chip
- Choice Chip
- Input Chip
- Pill

## Overlays

- Modal
- Dialog
- Drawer
- Side Panel
- Bottom Sheet
- Popover
- Tooltip

## Navigation

- Tabs
- Segmented Control
- Breadcrumb
- Pagination
- Bottom Navigation
- Sidebar

## UX Patterns

- Progressive Disclosure
- Infinite Scroll
- Load More
- Empty State
- Skeleton Loading
- Optimistic Update

Cette liste est une **direction de contenu pour le MVP élargi**, pas une instruction pour le Vertical Slice.

---

# 23. Évolutions ultérieures

Après validation du MVP élargi, le produit pourra étudier :

- recherche fuzzy plus riche ;
- navigation par intention ;
- navigation par environnement ;
- comparaisons génériques ;
- davantage de visuels ;
- recherche sémantique ;
- embeddings ;
- recommandations IA ;
- Prompt Builder ;
- comptes et collections ;
- internationalisation ;
- export Markdown ;
- export du prompt ;
- intégration avec Codex comme capacité produit future ;
- audit automatique d’une interface.

Aucune de ces évolutions ne doit être anticipée au point de compliquer la V1.

---

# 24. Ordre Codex officiel

L'ordre de travail recommandé est :

```text
1. Project setup
2. Zod V1 contract
3. Content loader
4. Filter Chip data
5. Badge data
6. Tag data
7. Comparison data
8. Generic Concept Page
9. Homepage
10. Search Results + Search V1
11. Comparison Page
12. Static Prompt + Copy
13. Accessibility / Responsive
14. Tests / Build cleanup
```

Ne pas demander à Codex de construire le site complet en une seule étape.

---

# 25. Principe final

Le premier objectif n'est pas :

> avoir beaucoup de contenu.

Le premier objectif est :

> prouver la chaîne intention → concept → compréhension → comparaison → prompt avec trois concepts seulement.

Une fois cette chaîne validée, l'échelle devient un problème beaucoup plus simple.
