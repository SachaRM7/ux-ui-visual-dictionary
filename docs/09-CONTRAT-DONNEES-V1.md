# 09 — Contrat de données V1

## 1. Statut du document

Ce document définit le contrat de données officiel du premier vertical slice.

Il constitue la source de vérité technique pour l'implémentation V1.

`03-SCHEMA-DES-FICHES.md` reste le modèle conceptuel complet et représente la cible à long terme.

La V1 ne doit implémenter que les champs et comportements décrits dans ce document.

En cas de différence entre le schéma complet du document 03 et ce document concernant le premier vertical slice, le présent document prévaut pour l'implémentation V1.

---

# 2. Périmètre couvert

Le contrat V1 doit uniquement permettre le parcours :

Homepage
→ Search
→ Filter Chip
→ Concept Detail
→ Filter Chip / Badge / Tag Comparison
→ AI Prompt

Le système doit prendre en charge trois concepts :

- `filter-chip`
- `badge`
- `tag`

Seul `filter-chip` nécessite une fiche éditoriale complète lors du premier vertical slice.

Badge et Tag doivent toutefois exister comme concepts structurés afin :

- d'être référencés par les relations ;
- d'apparaître dans la comparaison ;
- d'être validés par le catalogue.

---

# 3. Entités V1

Le système possède uniquement deux entités métier principales :

## Concept

Représente une notion UI/UX canonique.

Exemples :

- Filter Chip
- Badge
- Tag

## Comparison

Représente une comparaison éditoriale entre plusieurs concepts existants.

Aucune entité métier indépendante n'est nécessaire en V1 pour :

- Category ;
- Source ;
- Visual ;
- Prompt.

Ces éléments restent des structures imbriquées dans les données.

---

# 4. Convention de nommage

Les fichiers de contenu utilisent :

`snake_case`

Exemple :

```yaml
canonical_name:
short_definition:
use_when:

Les objets TypeScript peuvent utiliser les mêmes noms afin d'éviter une transformation inutile pendant la V1.

Ne pas maintenir deux conventions parallèles sans nécessité.

Les identifiants et slugs utilisent :

kebab-case

Exemples :

filter-chip
bottom-sheet
segmented-control
## 5. Concept V1

Structure minimale :

id:
canonical_name:
slug:
status:
interactive:

category:
  primary:
  secondary:
  tertiary:

short_definition:
definition:
purpose:

use_when: []
avoid_when: []

variants: []
states: []

relationships:
  parent: []
  commonly_confused_with: []
  alternatives_to: []
  related_patterns: []

visuals:
  isolated:

sources: []

search:
  keywords: []
  natural_language_queries: []
  tags: []

ai:
  short_prompt:
  detailed_prompt:
## 6. Champs obligatoires

Chaque Concept V1 doit posséder :

id
canonical_name
slug
status
interactive
category
short_definition
definition
purpose
use_when
avoid_when
variants
states
relationships
visuals.isolated
sources
search
ai.short_prompt
ai.detailed_prompt
## 7. Status

Valeurs V1 autorisées :

draft
pilot
published

Ne pas implémenter pour l'instant :

review
deprecated
archived
## 8. Category

Structure :

category:
  primary:
  secondary:
  tertiary:

Les trois niveaux sont obligatoires dans la V1.

Les valeurs doivent provenir de la taxonomie contrôlée.

Les catégories ne doivent pas être saisies librement avec différentes variantes orthographiques ou de casse.

## 9. Variants

Les variantes utilisent obligatoirement des objets.

Exemple :

variants:
  - id: text-only
    name: Text Only
    description: Filter Chip contenant uniquement un label.

Ne pas utiliser :

variants:
  - text-only
  - icon

## 10. States

Les états utilisent également des objets structurés.

Exemple :

states:
  - id: default
    name: Default
    description: État disponible mais non sélectionné.

  - id: selected
    name: Selected
    description: Le filtre est actif.
## 11. Concepts interactifs

Lorsqu'un concept possède :

interactive: true

les blocs suivants deviennent obligatoires :

selection_model:
interaction_model:
accessibility:
## 12. Selection Model

Structure :

selection_model:
  type:
  min_selection:
  max_selection:

Valeurs possibles de type :

none
single
multiple
binary
mixed

Pour le Filter Chip pilote :

selection_model:
  type: multiple
  min_selection: 0
  max_selection: null

Le comportement pilote officiel est donc :

multi-select.

L'existence possible de Filter Chips single-select peut être expliquée dans le contenu éditorial, mais ce n'est pas le comportement choisi pour la démonstration V1.

## 13. Interaction Model

Structure :

interaction_model:
  trigger:
  activation:
  deactivation:
  immediate_effect:
  requires_confirmation:

Pour le Filter Chip pilote :

interaction_model:
  trigger: click_or_tap
  activation: toggle
  deactivation: toggle
  immediate_effect: true
  requires_confirmation: false

Le comportement officiel du prototype est donc :

sélection
→ mise à jour immédiate

et non :

sélection
→ bouton Appliquer.

La fiche éditoriale peut expliquer que d'autres architectures existent dans des systèmes de filtrage plus complexes.

## 14. Accessibility

Structure minimale :

accessibility:
  semantic_role:
  native_element:
  keyboard:
  focus:
  contrast:
  target_size:
  color_independence:

Les composants interactifs publiés doivent toujours posséder ce bloc.

## 15. Relationships

Structure V1 :

relationships:
  parent: []
  commonly_confused_with: []
  alternatives_to: []
  related_patterns: []

Toutes les relations utilisent exclusivement les id des concepts.

Exemple :

commonly_confused_with:
  - badge
  - tag

Ne jamais utiliser des noms d'affichage comme relation.

Mauvais :

commonly_confused_with:
  - Badge

Bon :

commonly_confused_with:
  - badge

Une relation :

ne peut pas pointer vers elle-même ;
doit être unique ;
doit pointer vers un concept existant dans le catalogue.
## 16. Alias

Champ optionnel :

aliases: []

Un alias :

ne peut pas être identique au canonical_name ;
ne doit pas être partagé par plusieurs concepts sans décision éditoriale explicite.

Par conséquent :

canonical_name: Filter Chip
aliases:
  - Filter Chip

est interdit.

Concernant :

Filter Pill

la V1 le considère comme :

alternative_names:
  - Filter Pill

et non comme un synonyme canonique garanti.

## 17. Visuals

La V1 exige uniquement :

visuals:
  isolated:

Le visuel isolé doit être un visuel pédagogique interne.

Les éléments suivants sont hors contrat obligatoire V1 :

contextual ;
comparison ;
do_dont ;
animations ;
screenshots réels.

Un concept published doit posséder un asset réel.

Un visuel encore marqué to_create interdit le passage à published.

## 18. Sources

Structure V1 :

sources:
  - name:
    url:
    publisher:
    source_type:
    usage:
    license:
    attribution_required:
    last_verified:

Pour une fiche published, les champs obligatoires sont :

name
url
publisher
source_type
usage
license
last_verified

attribution_required peut être optionnel.

last_verified utilise une date ISO :

YYYY-MM-DD

Une fiche publiée ne peut pas contenir uniquement une mention textuelle de source.

Les sources doivent être structurées.

## 19. Source Types

Valeurs contrôlées :

official_guideline
design_system
pattern_library
component_gallery
real_world_example
research
standard
article
## 20. Recherche V1

Structure :

search:
  keywords: []
  natural_language_queries: []
  tags: []

Pas de :

embeddings ;
semantic search ;
intents ;
vector database ;
fuzzy engine avancé.
## 21. Recherche — normalisation

La V1 doit au minimum :

convertir la requête en minuscules ;
trim les espaces ;
réduire les espaces multiples ;
comparer sans sensibilité à la casse.

Une normalisation des accents peut être ajoutée si elle reste simple.

## 22. Recherche — données indexées

Indexer :

canonical_name
aliases
alternative_names
search.keywords
search.natural_language_queries
search.tags
short_definition
definition
## 23. Recherche — exigence pilote

Cette requête :

petits boutons pour filtrer

doit retourner :

Filter Chip

comme premier résultat.

La raison de correspondance doit pouvoir être affichée.

Exemple :

Correspondance avec une formulation utilisateur associée à ce concept.

## 24. Prompt IA

Structure :

ai:
  short_prompt:
  detailed_prompt:

Les prompts sont :

éditoriaux ;
déterministes ;
stockés avec le concept ;
directement copiables.

Aucun appel à un modèle IA n'est effectué par le produit pendant la V1.

## 25. Comparison

Structure :

id:
concepts: []

criteria:
  function:
  interaction:
  selection:
  role:
  context:
  use_case:

Pour le premier vertical slice :

concepts:
  - filter-chip
  - badge
  - tag

## 26. Comparison — règles

La comparaison est éditoriale et manuelle.

Elle ne doit pas être générée dynamiquement par une IA.

Chaque critère doit posséder une valeur pour les trois concepts.

Les critères V1 sont :

function
interaction
selection
role
context
use_case

La comparaison ne crée jamais une nouvelle définition canonique.

Elle référence les concepts existants.

## 27. Champs optionnels V1

Le schéma peut accepter :

aliases
alternative_names
user_goal
problem_solved
anatomy
responsive
design_system_references
comparisons
description du visuel
attribution_required
touch
notes diverses

Ils ne doivent pas bloquer le fonctionnement technique minimal.

## 28. Hors contrat V1

Ne pas rendre obligatoires :

content_quality
visual_status
source_status
domains
deprecated_names
design_system_names
level
heuristics
decision_rules
decision_matrix
recommended_combinations
data_behavior
loading_behavior
empty_state_behavior
error_behavior
persistence
responsive_transformations
visuals.contextual
visuals.comparison
visuals.do_dont
visual_annotations
examples.educational
examples.real_world
search.intents
search.misspellings
audit_prompt
comparison_prompt
visual_prompt
prompt_blocks

Ces éléments restent disponibles dans le modèle cible du document 03.

## 29. Validation Zod

La V1 doit disposer d'une validation automatique.

Identité
id non vide ;
id en kebab-case ;
slug non vide ;
slug en kebab-case ;
id unique ;
slug unique ;
canonical_name non vide.
Aliases
aucun alias vide ;
aucun alias identique au nom canonique ;
pas d'alias partagé sans validation éditoriale.
Category
primary obligatoire ;
secondary obligatoire ;
tertiary obligatoire ;
valeurs issues du catalogue contrôlé.
Contenu
short_definition non vide ;
definition non vide ;
purpose non vide ;
use_when ≥ 1 pour published ;
avoid_when ≥ 1 pour published ;
pas de chaînes vides ;
pas de doublons ;
variants structurés ;
states structurés.
Relations
uniquement des ids ;
aucune auto-référence ;
cible existante ;
aucune duplication.
Visual

Pour published :

visuals.isolated obligatoire ;
asset existant.
Sources

Pour published :

au moins une source ;
URL valide ;
source_type valide ;
license renseignée ;
last_verified valide.
Search
tableaux de chaînes ;
aucune chaîne vide ;
déduplication insensible à la casse ;
au moins un terme indexable.
AI

Pour published :

short_prompt non vide ;
detailed_prompt non vide.
Interactive

Si :

interactive: true

alors :

states obligatoire ;
selection_model obligatoire ;
interaction_model obligatoire ;
accessibility obligatoire.
## 30. Publication

Un concept peut être :

draft
pilot
published

Pour devenir published, il doit avoir :

tous ses champs obligatoires ;
un visuel isolé réel ;
des sources structurées ;
des relations valides ;
des prompts complets ;
les blocs interactifs lorsqu'ils sont applicables.
31. Filter Chip — décisions officielles V1

Pour le premier vertical slice :

id: filter-chip
interactive: true

Le comportement de démonstration est :

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

Cela signifie :

plusieurs Filter Chips peuvent être actifs ;
un clic/tap inverse l'état du filtre ;
les résultats sont mis à jour immédiatement ;
aucun bouton Apply n'est nécessaire.
## 32. Badge et Tag

Badge et Tag existent comme Concepts V1 afin de :

résoudre les relations ;
alimenter la comparaison ;
permettre l'évolution future vers leurs propres fiches.

Ils n'ont pas besoin d'une page éditoriale complète pendant le premier vertical slice.

Leur status peut rester :

pilot
## 33. Principe directeur

Le contrat V1 doit rester limité à :

Concept
+
Search
+
Isolated Visual
+
Relationships
+
Editorial Comparison
+
Static AI Prompt

Tout le reste doit être ajouté uniquement lorsqu'un besoin produit validé le justifie.