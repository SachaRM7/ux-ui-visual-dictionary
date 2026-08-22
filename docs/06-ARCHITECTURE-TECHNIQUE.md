# 06 — Architecture technique

## 1. Objectif

Ce document décrit l'architecture technique du projet **UI/UX Visual Dictionary**.

Il distingue explicitement :

- ce qui est réellement nécessaire au **Vertical Slice V1** ;
- les capacités prévues pour le **MVP élargi** ;
- les évolutions possibles à plus long terme.

Le principe directeur est simple :

> construire le minimum technique nécessaire pour valider la mécanique du produit avant d'ajouter de l'infrastructure.

Pour la V1, la source de vérité technique des données est :

`09-CONTRAT-DONNEES-V1.md`

Le modèle conceptuel complet reste décrit dans :

`03-SCHEMA-DES-FICHES.md`

---

# 2. Périmètre technique du Vertical Slice V1

Le Vertical Slice V1 doit uniquement permettre ce parcours :

```text
Homepage
→ Search Results
→ Filter Chip
→ Concept Detail
→ Comparison Filter Chip / Badge / Tag
→ Static AI Prompt
```

Trois concepts existent dans le catalogue V1 :

- `filter-chip`
- `badge`
- `tag`

Seul `filter-chip` nécessite une fiche éditoriale complète pendant ce slice.

`badge` et `tag` doivent contenir les données minimales nécessaires aux relations et à la comparaison.

---

# 3. Ce que la V1 doit prouver

L'application doit démontrer qu'un contenu structuré peut être :

1. validé ;
2. chargé ;
3. recherché ;
4. rendu génériquement ;
5. relié à d'autres concepts ;
6. comparé éditorialement ;
7. utilisé pour afficher et copier un prompt statique.

La V1 ne doit pas chercher à prouver davantage.

---

# 4. Stack V1

Stack recommandée pour le premier développement :

```text
Next.js
React
TypeScript
Zod
```

L'objectif n'est pas d'exploiter toutes les possibilités du framework.

Le framework sert principalement à fournir :

- routing ;
- rendu des pages ;
- composants réutilisables ;
- TypeScript ;
- validation au build ;
- base claire pour une évolution ultérieure.

---

# 5. Données

Les contenus V1 sont versionnés dans le repository.

Structure recommandée :

```text
content/
  concepts/
    filter-chip.yaml
    badge.yaml
    tag.yaml

  comparisons/
    filter-chip-vs-badge-vs-tag.yaml
```

Les données restent locales.

La V1 ne nécessite pas :

- PostgreSQL ;
- Supabase ;
- CMS ;
- API de contenu ;
- synchronisation cloud ;
- base de données distante.

Une migration vers une base distante ne doit être envisagée que lorsqu'un besoin réel la justifie.

---

# 6. Format de contenu

Le format canonique recommandé pour la V1 est YAML.

Les clés de données utilisent :

```text
snake_case
```

Exemples :

```yaml
canonical_name:
short_definition:
natural_language_queries:
selection_model:
```

Les identifiants et slugs utilisent :

```text
kebab-case
```

Exemples :

```text
filter-chip
segmented-control
bottom-sheet
```

L'implémentation TypeScript V1 peut conserver les propriétés `snake_case`.

Il ne faut pas introduire une couche de conversion `snake_case` → `camelCase` sans nécessité.

---

# 7. Contrat de données

Le contrat obligatoire du Vertical Slice est :

`09-CONTRAT-DONNEES-V1.md`

Il définit notamment :

- les champs obligatoires ;
- les champs optionnels ;
- les structures `Concept` et `Comparison` ;
- les relations ;
- la recherche ;
- les prompts statiques ;
- les règles de publication ;
- le comportement pilote de Filter Chip.

Le schéma universel de `03-SCHEMA-DES-FICHES.md` décrit la cible globale mais ne doit pas être implémenté intégralement en V1.

---

# 8. Validation

Les fichiers de contenu doivent être validés avec TypeScript et Zod avant leur utilisation.

La validation doit notamment vérifier :

- forme générale du document ;
- types des champs ;
- IDs et slugs en kebab-case ;
- unicité des IDs et slugs ;
- catégories requises ;
- variantes et états structurés ;
- relations valides ;
- sources requises pour `published` ;
- visuel isolé requis pour `published` ;
- prompts requis pour `published` ;
- blocs interactifs requis lorsque `interactive: true`.

Le build ne doit pas accepter silencieusement du contenu invalide.

---

# 9. TypeScript

Les types TypeScript doivent refléter le contrat V1.

Exemple simplifié :

```ts
interface Variant {
  id: string
  name: string
  description: string
}

interface State {
  id: string
  name: string
  description: string
}

interface Concept {
  id: string
  canonical_name: string
  slug: string
  status: "draft" | "pilot" | "published"
  interactive: boolean
  short_definition: string
  definition: string
  purpose: string
  variants: Variant[]
  states: State[]
}
```

Les interfaces TypeScript doivent reprendre directement les noms de champs du contrat V1 et conserver `states` comme une liste d'objets structurés.

Ne pas introduire d'ancienne convention de nommage ou de représentation simplifiée parallèle au contrat V1.

---

# 10. Rendu générique

Ne pas créer une page métier dédiée à Filter Chip.

Éviter :

```text
FilterChipPage.tsx
```

Préférer une page générique :

```text
ConceptPage
```

alimentée par les données du concept.

Le fait que Filter Chip soit le concept pilote ne doit pas créer une architecture spécifique à Filter Chip.

---

# 11. Routes V1

Routes minimales :

```text
/
 /search
 /concepts/[slug]
 /compare/filter-chip-badge-tag
```

Il n'est pas nécessaire de créer une route autonome pour le Prompt Builder.

Le prompt V1 est affiché dans la fiche concept et peut également être rappelé depuis la comparaison.

---

# 12. Recherche V1

La recherche est locale et déterministe.

Les champs indexés et les règles exactes sont définis dans `09-CONTRAT-DONNEES-V1.md`.

La V1 doit notamment pouvoir transformer :

```text
petits boutons pour filtrer
```

en un résultat principal :

```text
Filter Chip
```

La recherche doit pouvoir expliquer la raison de la correspondance.

---

# 13. Recherche hors V1

Ne pas implémenter pendant le Vertical Slice :

- embeddings ;
- vector database ;
- semantic search ;
- moteur LLM ;
- recherche par image ;
- fuzzy engine avancé.

Ces capacités pourront être étudiées après validation du produit.

---

# 14. Comparaison V1

La comparaison V1 est une donnée éditoriale structurée.

Elle concerne uniquement :

```text
Filter Chip
Badge
Tag
```

Critères :

- `function`
- `interaction`
- `selection`
- `role`
- `context`
- `use_case`

La comparaison :

- n'est pas générée par une IA ;
- n'est pas déduite automatiquement ;
- ne remplace pas les définitions canoniques ;
- référence des concepts existants.

---

# 15. Prompts V1

Les prompts V1 sont :

- statiques ;
- éditoriaux ;
- déterministes ;
- stockés dans les données ;
- copiables tels quels.

Structure minimale :

```yaml
ai:
  short_prompt:
  detailed_prompt:
```

La V1 ne fait **aucun appel à un modèle IA**.

---

# 16. Prompt Builder futur

Les prompts composables par blocs constituent une capacité future.

À terme, un système pourra éventuellement assembler des informations telles que :

```text
Goal
Layout
Components
Interactions
Hierarchy
Responsive
Accessibility
```

Cette architecture n'est **pas une exigence V1**.

Elle ne doit pas conduire à ajouter dès maintenant :

- un moteur de composition ;
- une orchestration IA ;
- un endpoint LLM ;
- un état multi-concepts.

---

# 17. Relations V1

Les relations techniques utilisent uniquement des IDs de concepts existants dans le catalogue V1.

Pour Filter Chip :

```yaml
relationships:
  parent: []

  commonly_confused_with:
    - badge
    - tag

  alternatives_to: []
  related_patterns: []
```

Les autres concepts pédagogiquement associés peuvent être mentionnés dans le contenu éditorial, mais ne doivent pas devenir des références techniques invalides.

---

# 18. Visuels V1

La V1 exige uniquement :

```text
visuals.isolated
```

Le visuel doit être :

- pédagogique ;
- interne ;
- neutre ;
- séparé des références externes.

Un concept peut rester `pilot` tant que son asset final n'existe pas.

Un concept `published` doit posséder un asset isolé réel conformément au contrat V1.

Les éléments suivants ne sont pas obligatoires :

- visuel contextualisé ;
- visuel Do / Don't ;
- animation ;
- screenshot de produit réel.

---

# 19. Sources

Les métadonnées des sources suivent `04-SOURCING-ET-DROITS.md` et `09-CONTRAT-DONNEES-V1.md`.

La convention V1 utilise :

```text
last_verified
```

et non `date_accessed` comme champ canonique de vérification.

Ne pas copier de contenu externe dans le repository sans vérification des droits de réutilisation.

---

# 20. Accessibilité

L'application V1 doit inclure au minimum :

- HTML sémantique ;
- navigation clavier ;
- focus visible ;
- noms accessibles pour les actions ;
- contraste suffisant ;
- structure de titres cohérente ;
- tableau de comparaison utilisable sur petit écran.

Pour le Filter Chip pilote, la sémantique et le comportement sont définis dans `08-FICHE-MODELE-FILTER-CHIP.md` et `09-CONTRAT-DONNEES-V1.md`.

---

# 21. Responsive

Les quatre écrans du Vertical Slice doivent être utilisables sur :

- mobile ;
- tablette ;
- desktop.

La V1 ne nécessite pas de système responsive avancé spécifique à chaque concept.

---

# 22. Tests prioritaires

Priorité aux tests qui protègent la mécanique produit.

## Validation

Tester :

- concept valide ;
- concept invalide ;
- relation vers une cible inexistante ;
- concept interactif incomplet ;
- publication sans visuel ;
- publication sans source valide.

## Recherche

Tester au minimum :

```text
filter chip
```

et :

```text
petits boutons pour filtrer
```

Les deux doivent retourner Filter Chip en premier.

Tester également une recherche sans résultat.

## Comparaison

Vérifier que :

- les trois concepts sont présents ;
- les six critères sont complets ;
- aucune cellule obligatoire n'est vide.

## Prompt

Vérifier que :

- le prompt court s'affiche ;
- le prompt détaillé s'affiche ;
- la copie fonctionne ;
- aucun appel IA n'est nécessaire.

---

# 23. Vérifications avant validation d'une tâche

Avant de considérer une tâche de code comme terminée, exécuter lorsque pertinent :

```text
lint
typecheck
tests
build
```

Ne pas déclarer une tâche terminée avec des erreurs connues.

---

# 24. Performance

La V1 contient seulement trois concepts.

Ne pas introduire d'optimisation complexe prématurée.

Les choix doivent néanmoins éviter :

- des calculs inutiles ;
- du contenu dupliqué ;
- du JavaScript inutile ;
- des assets excessivement lourds.

---

# 25. SEO

Le SEO n'est pas un objectif de validation principal du Vertical Slice.

Conserver néanmoins :

- URLs lisibles ;
- titres de pages corrects ;
- contenu HTML indexable.

Une stratégie SEO détaillée peut être ajoutée avec le MVP élargi.

---

# 26. Analytics

Les analytics avancées sont hors Vertical Slice.

Si une mesure est ajoutée plus tard, les signaux les plus utiles seront probablement :

- requêtes effectuées ;
- recherches sans résultat ;
- concepts consultés ;
- comparaisons ouvertes ;
- prompts copiés.

Aucun système analytics ne doit bloquer le premier développement.

---

# 27. Internationalisation

La V1 n'implémente pas une internationalisation complète.

Les noms canoniques UI/UX peuvent rester en anglais.

Le contenu pédagogique du premier slice peut être en français.

Une structure multilingue complète sera décidée ultérieurement.

---

# 28. Évolution par versions

## V1 — Vertical Slice

Inclut :

- catalogue local de trois concepts ;
- fiche complète Filter Chip ;
- données minimales Badge et Tag ;
- validation TypeScript + Zod ;
- homepage ;
- résultats de recherche ;
- fiche concept ;
- recherche déterministe ;
- comparaison éditoriale Filter Chip / Badge / Tag ;
- prompts statiques copiables ;
- responsive et accessibilité de base.

N'inclut pas :

- base distante ;
- embeddings ;
- semantic search ;
- assistant IA ;
- génération dynamique ;
- Prompt Builder avancé.

## V2 — MVP élargi

Peut ajouter :

- bibliothèque initiale de 20 à 30 concepts ;
- navigation par catégories ;
- davantage de fiches complètes ;
- comparaisons supplémentaires ;
- recherche fuzzy simple ;
- enrichissement des relations ;
- davantage de visuels.

## V3 — Capacités intelligentes

Peut étudier :

- recherche sémantique ;
- embeddings ;
- recommandations contextuelles ;
- assistant IA ;
- génération dynamique de prompts ;
- Prompt Builder multi-concepts.

---

# 29. Priorité technique

Ne pas commencer par une infrastructure ambitieuse.

Le premier objectif est :

> prouver que la structure de connaissances et le parcours utilisateur fonctionnent avec Filter Chip, Badge et Tag.

Le principal actif du produit reste :

```text
Taxonomie
+
Relations
+
Contenu
+
Recherche
+
Comparaison
```

L'architecture doit servir cette connaissance, pas devenir le projet principal.
