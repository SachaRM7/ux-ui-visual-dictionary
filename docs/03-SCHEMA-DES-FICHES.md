# Schéma universel des fiches

## 1. Objectif

Toutes les notions de la plateforme doivent utiliser une structure commune.

Cette structure constitue la **source de vérité** de chaque concept.

Les fiches mémo, les pages détaillées du site, le moteur de recherche, le comparateur, les recommandations UX et les prompts IA doivent tous consommer ces mêmes données.

L'objectif est d'éviter :

- les doublons ;
- les incohérences ;
- les informations contradictoires ;
- les fiches structurées différemment ;
- les contenus difficiles à exploiter automatiquement.

## 1.5 Statut du schéma

Ce document décrit le modèle conceptuel complet et la cible à long terme de la base de connaissances.

Il ne constitue pas intégralement le contrat technique obligatoire du premier vertical slice.

Pour l'implémentation V1, la source de vérité technique est :

`09-CONTRAT-DONNEES-V1.md`

Le document 09 définit :
- les champs obligatoires V1 ;
- les champs optionnels V1 ;
- les conventions de nommage ;
- les règles de validation ;
- le comportement pilote de Filter Chip ;
- les structures réellement implémentées par Codex.

Les champs décrits dans le présent document mais absents du contrat V1 doivent être considérés comme des capacités futures.
---

# 2. Principe général

Une fiche représente un **concept canonique**.

Ce concept peut être :

- un composant UI ;
- un pattern UX ;
- un layout ;
- un style visuel ;
- une interaction ;
- un flow utilisateur ;
- une règle UX ;
- un principe psychologique ;
- un élément de design system ;
- un concept CRO ;
- un concept d'accessibilité.

Chaque concept possède une structure commune, mais certaines sections peuvent rester facultatives lorsqu'elles ne sont pas pertinentes.

---

# 3. Identité

Chaque concept doit posséder :

```yaml
id:
canonical_name:
slug:
short_name:
```

Exemple :

```yaml
id: filter-chip
canonical_name: Filter Chip
slug: filter-chip
short_name: Filter Chip
```

---

# 4. Statut éditorial

Chaque fiche doit pouvoir indiquer son niveau d'avancement.

```yaml
status:
content_quality:
visual_status:
source_status:
```

Valeurs possibles :

```text
status:
- draft
- pilot
- review
- published
- deprecated
```

Exemple :

```yaml
status: pilot
content_quality: reference
visual_status: to_create
source_status: partially_verified
```

---

# 5. Catégorisation

```yaml
category:
  primary:
  secondary:
  tertiary:
```

Exemple :

```yaml
category:
  primary: UI Components
  secondary: Selection Controls
  tertiary: Chips
```

---

# 6. Domaines associés

Une fiche peut appartenir à plusieurs domaines transversaux.

```yaml
domains: []
```

Exemple :

```yaml
domains:
  - UI Design
  - Interaction Design
  - Search UX
  - Responsive Design
  - Accessibility
```

---

# 7. Terminologie

```yaml
aliases: []
alternative_names: []
deprecated_names: []
design_system_names: []
```

Il faut distinguer clairement :

- véritable synonyme ;
- terme proche ;
- appellation spécifique à un design system ;
- ancienne appellation ;
- terme informel.

Exemple :

```yaml
canonical_name: Filter Chip
aliases: []

alternative_names:
  - Filter Pill
```

Le nom canonique ne doit jamais être répété dans `aliases`.
`Filter Pill` est ici traité comme une appellation alternative, pas comme un synonyme canonique garanti.

Un terme proche ne doit pas être ajouté comme synonyme s'il représente en réalité un concept différent.

---

# 8. Définition

```yaml
definition:
short_definition:
```

## short_definition

Phrase courte destinée notamment :

- aux résultats de recherche ;
- aux cartes ;
- aux fiches mémo.

## definition

Explication plus complète du concept.

---

# 9. Définition pédagogique

Certaines notions nécessitent une reformulation plus accessible.

```yaml
plain_language_explanation:
```

Cette section doit expliquer la notion sans présupposer une connaissance du jargon.

---

# 10. Objectif UX

```yaml
purpose:
user_goal:
problem_solved:
```

Expliquer :

- à quoi sert le pattern ;
- quel problème il résout ;
- ce que cherche à accomplir l'utilisateur.

Exemple :

```yaml
purpose: >
  Permettre un filtrage rapide tout en maintenant les critères importants visibles.

user_goal: >
  Affiner rapidement une liste de résultats.

problem_solved: >
  Éviter d'ouvrir une interface de filtrage complexe pour les critères les plus fréquents.
```

---

# 11. Anatomie

Décrire les sous-éléments d'un composant ou d'un pattern.

```yaml
anatomy:
  - name:
    required:
    description:
```

Exemple :

```yaml
anatomy:
  - name: container
    required: true
    description: Surface interactive principale.

  - name: label
    required: true
    description: Texte décrivant le filtre.

  - name: selection_indicator
    required: false
    description: Indique visuellement l'état sélectionné.
```

---

# 12. Variantes

```yaml
variants:
  - id:
    name:
    description:
    use_when:
    avoid_when:
```

Exemple :

```yaml
variants:
  - id: icon-filter-chip
    name: Icon Filter Chip
    description: Filter Chip accompagné d'une icône.
```

---

# 13. États

```yaml
states:
  - id:
    name:
    description:
    visual_requirement:
```

États courants :

```text
default
hover
focus
active
pressed
selected
checked
disabled
loading
pending
error
success
read-only
empty
offline
```

Tous les états ne s'appliquent pas à tous les concepts.

---

# 14. Modèle de sélection

Cette section concerne les composants permettant un choix ou un état.

```yaml
selection_model:
  type:
  min_selection:
  max_selection:
  notes:
```

Valeurs possibles :

```text
none
single
multiple
binary
mixed
```

Exemple :

```yaml
selection_model:
  type: multiple
  min_selection: 0
  max_selection: null
```

---

# 15. Modèle d'interaction

Décrire précisément comment l'utilisateur agit sur le composant.

```yaml
interaction_model:
  trigger:
  activation:
  deactivation:
  immediate_effect:
  requires_confirmation:
  notes:
```

Exemple :

```yaml
interaction_model:
  trigger: click_or_tap
  activation: toggle
  deactivation: toggle
  immediate_effect: true
  requires_confirmation: false
```

---

# 16. Interaction clavier

```yaml
keyboard:
  focusable:
  navigation:
  activation:
  escape_behavior:
  notes:
```

Exemple :

```yaml
keyboard:
  focusable: true
  navigation:
    - Tab
  activation:
    - Enter
    - Space
```

---

# 17. Interaction tactile

```yaml
touch:
  supported:
  gestures: []
  min_target_guidance:
  notes:
```

---

# 18. Comportement des données

Certaines interactions modifient du contenu ou déclenchent une requête.

```yaml
data_behavior:
  update_mode:
  debounce:
  optimistic:
  server_request:
  notes:
```

Valeurs possibles pour `update_mode` :

```text
immediate
on_apply
manual
deferred
```

---

# 19. Comportement de chargement

```yaml
loading_behavior:
  expected:
  recommended_feedback: []
  preserve_previous_content:
  notes:
```

Exemple :

```yaml
loading_behavior:
  expected: conditional
  recommended_feedback:
    - skeleton
    - inline-spinner
```

---

# 20. Comportement Empty State

```yaml
empty_state_behavior:
  possible:
  message:
  recovery_actions: []
```

Exemple :

```yaml
empty_state_behavior:
  possible: true
  recovery_actions:
    - clear-filters
    - remove-last-filter
```

---

# 21. Error Behavior

```yaml
error_behavior:
  possible:
  error_feedback:
  recovery_actions: []
```

---

# 22. Persistence

Décrire si l'état du composant doit être conservé.

```yaml
persistence:
  route_change:
  page_reload:
  session:
  cross_session:
  notes:
```

---

# 23. Utilisation recommandée

```yaml
use_when: []
```

Chaque condition doit être concrète.

Exemple :

```yaml
use_when:
  - Les filtres sont fréquemment utilisés.
  - Les critères doivent rester visibles.
  - Les labels sont courts.
```

---

# 24. Situations à éviter

```yaml
avoid_when: []
```

Exemple :

```yaml
avoid_when:
  - Le nombre d'options est très important.
  - Le contenu nécessite plusieurs niveaux hiérarchiques.
```

---

# 25. Règles de décision

Cette section permet au moteur de recommandation de comprendre quand choisir ce concept.

```yaml
decision_rules:
  ideal_conditions: []
  warning_conditions: []
  disqualifying_conditions: []
```

Exemple :

```yaml
decision_rules:
  ideal_conditions:
    - small_option_count
    - high_frequency
    - visibility_required

  warning_conditions:
    - medium_option_count
    - limited_mobile_space

  disqualifying_conditions:
    - very_large_option_count
    - complex_hierarchy
```

---

# 26. Règles quantitatives

Lorsque cela est pertinent :

```yaml
heuristics:
  option_count:
  label_length:
  visible_items:
  interaction_frequency:
```

Ces valeurs ne doivent pas être utilisées comme règles universelles si aucune norme claire n'existe.

Elles peuvent être qualitatives :

```text
low
medium
high
```

---

# 27. Bonnes pratiques

```yaml
best_practices: []
```

Exemple :

```yaml
best_practices:
  - keep_labels_short
  - make_selection_obvious
  - preserve_focus_visibility
```

---

# 28. Anti-patterns

```yaml
anti_patterns:
  - id:
    description:
    consequence:
```

Exemple :

```yaml
anti_patterns:
  - id: too-many-filter-chips
    description: Afficher des dizaines de Filter Chips simultanément.
    consequence: Augmente la charge cognitive et ralentit le scan.
```

---

# 29. Content Guidelines

Cette section documente la rédaction du contenu intégré au composant.

```yaml
content_guidelines:
  label_style:
  recommended_length:
  grammar:
  capitalization:
  avoid: []
  examples_good: []
  examples_bad: []
```

---

# 30. Microcopy

Lorsque le pattern possède des messages secondaires :

```yaml
microcopy:
  helper_text:
  empty_state:
  error:
  confirmation:
  clear_action:
```

---

# 31. Accessibilité

```yaml
accessibility:
  semantic_role:
  native_element:
  aria:
  keyboard:
  focus:
  contrast:
  target_size:
  screen_reader:
  color_independence:
  notes: []
```

---

# 32. HTML / ARIA Notes

Lorsque pertinent :

```yaml
implementation_accessibility:
  recommended_html:
  recommended_aria:
  avoid_aria:
```

Attention :

Cette section doit rester informative et ne pas remplacer une documentation technique complète.

---

# 33. Responsive Behavior

```yaml
responsive:
  mobile:
    behavior:
    alternatives: []

  tablet:
    behavior:
    alternatives: []

  desktop:
    behavior:
    alternatives: []
```

---

# 34. Transformation responsive

Certains patterns changent de forme selon le device.

```yaml
responsive_transformations:
  - from:
    to:
    breakpoint_context:
    reason:
```

Exemple :

```yaml
responsive_transformations:
  - from: side-panel
    to: bottom-sheet
    breakpoint_context: mobile
    reason: Améliorer l'accessibilité tactile et exploiter la largeur disponible.
```

---

# 35. Relations entre concepts

```yaml
relationships:
  parent: []
  children: []
  variants_of: []
  similar_to: []
  alternatives_to: []
  commonly_confused_with: []
  used_with: []
  related_patterns: []
  replaces_on_mobile: []
  replaces_on_desktop: []
```

---

# 36. Types de relations

Le système doit pouvoir reconnaître les relations suivantes :

```text
parent_of
child_of
variant_of
similar_to
alternative_to
commonly_confused_with
used_with
related_pattern
replaces_on_mobile
replaces_on_desktop
```

---

# 37. Comparaisons explicites

```yaml
comparisons:
  - concept:
    shared_characteristics: []
    differences: []
    choose_this_when: []
    choose_other_when: []
```

---

# 38. Matrice de décision

Lorsqu'un concept possède plusieurs alternatives proches :

```yaml
decision_matrix:
  criteria:
    - name:
      value:
```

Exemple conceptuel :

```text
Filter Chip
vs Checkbox
vs Segmented Control
vs Select
```

Critères :

- nombre d'options ;
- sélection multiple ;
- fréquence d'usage ;
- espace ;
- visibilité ;
- mobile ;
- accessibilité.

---

# 39. Patterns complémentaires

```yaml
recommended_combinations:
  - concept:
    reason:
```

Exemple :

```yaml
recommended_combinations:
  - concept: bottom-sheet
    reason: Utiliser pour les filtres avancés sur mobile.
```

---

# 40. Visuels

Chaque concept doit idéalement pouvoir stocker plusieurs représentations.

```yaml
visuals:
  isolated:
    asset:
    status:
    description:

  contextual:
    asset:
    status:
    description:

  comparison:
    asset:
    status:
    description:

  do_dont:
    asset:
    status:
    description:
```

---

# 41. Visuel isolé

Objectif :

- reconnaître le composant ;
- voir son anatomie ;
- observer quelques états.

---

# 42. Visuel contextualisé

Objectif :

- montrer son emplacement réel ;
- montrer les composants qui l'entourent ;
- expliquer son rôle dans une interface.

---

# 43. Visuel comparatif

Objectif :

- comparer avec des concepts similaires ;
- mettre en évidence les différences fonctionnelles.

---

# 44. Visuel Do / Don't

Optionnel.

Objectif :

- montrer une bonne implémentation ;
- montrer un anti-pattern fréquent.

---

# 45. Annotations visuelles

```yaml
visual_annotations:
  - label:
    target:
    explanation:
```

---

# 46. Exemples pédagogiques

```yaml
examples:
  educational:
    - title:
      scenario:
      explanation:
```

---

# 47. Exemples réels

```yaml
examples:
  real_world:
    - product:
      platform:
      source:
      description:
```

Les exemples réels doivent rester séparés des illustrations pédagogiques internes.

---

# 48. Sources

```yaml
sources:
  - name:
    url:
    publisher:
    source_type:
    usage:
    license:
    attribution_required:
    last_verified:
```

---

# 49. Source Type

Valeurs possibles :

```text
official_guideline
design_system
pattern_library
component_gallery
real_world_example
research
standard
article
```

---

# 50. Usage des sources

Valeurs possibles :

```text
definition
terminology
accessibility
interaction
behavior
comparison
visual_reference
real_world_example
responsive
```

---

# 51. Références Design Systems

```yaml
design_system_references:
  - system:
    component_name:
    url:
    terminology_notes:
    differences:
```

Cette section permet de montrer que plusieurs design systems peuvent utiliser des noms différents pour des concepts proches.

---

# 52. Recherche

Chaque concept doit être optimisé pour plusieurs types de recherche.

```yaml
search:
  keywords: []
  natural_language_queries: []
  intents: []
  misspellings: []
```

---

# 53. Natural Language Queries

Exemple :

```yaml
search:
  natural_language_queries:
    - petits boutons pour filtrer
    - filtres rapides
    - pastilles de filtre
```

---

# 54. Intentions utilisateur

```yaml
intents:
  - filter-results
  - select-options
  - reduce-friction
```

Ces intentions permettront une recherche dépassant les simples mots-clés.

---

# 55. Tags

```yaml
tags: []
```

Exemple :

```yaml
tags:
  - filtering
  - search
  - mobile
  - selection
  - ecommerce
```

---

# 56. Niveau de complexité

```yaml
level:
```

Valeurs possibles :

```text
beginner
intermediate
advanced
```

---

# 57. AI Prompt — structure générale

```yaml
ai:
  short_prompt:
  detailed_prompt:
  audit_prompt:
  comparison_prompt:
  visual_prompt:
```

---

# 58. Prompt court

Instruction concise pouvant être copiée rapidement.

---

# 59. Prompt détaillé

Instruction plus précise incluant :

- rôle ;
- comportement ;
- états ;
- responsive ;
- accessibilité ;
- règles UX.

---

# 60. Audit Prompt

Permet de demander à une IA :

> Vérifie si ce pattern est correctement utilisé dans mon interface.

---

# 61. Comparison Prompt

Permet de demander :

> Compare ce pattern à ses principales alternatives dans ce contexte.

---

# 62. Visual Prompt

Instruction permettant de générer un visuel pédagogique du concept.

---

# 63. Blocs de prompts structurés

À terme :

```yaml
ai:
  prompt_blocks:
    intent:
    component:
    behavior:
    states:
    hierarchy:
    responsive:
    accessibility:
    content:
```

Cela permettra d'assembler automatiquement plusieurs concepts dans un seul prompt.

---

# 64. Critères de publication

Une fiche ne doit pas être publiée sans :

```text
id
canonical_name
category
definition
purpose
use_when
avoid_when
relationships
sources
```

Pour les composants interactifs, ajouter obligatoirement :

```text
states
interaction_model
accessibility
```

---

# 65. Critères de qualité avancée

Une fiche de référence complète doit idéalement disposer de :

```text
anatomy
variants
states
selection_model
interaction_model
data_behavior
loading_behavior
empty_state_behavior
content_guidelines
decision_rules
responsive
accessibility
relationships
comparisons
visuals
sources
AI prompts
```

---

# 66. Exemple complet — Filter Chip

> **Exemple conceptuel long terme.** Ce bloc illustre les capacités du schéma universel. Il ne doit pas être utilisé comme contrat d'implémentation V1. Pour le Vertical Slice V1, `09-CONTRAT-DONNEES-V1.md` et `08-FICHE-MODELE-FILTER-CHIP.md` prévalent.

```yaml
id: filter-chip

canonical_name: Filter Chip
slug: filter-chip

status: pilot

category:
  primary: UI Components
  secondary: Selection Controls
  tertiary: Chips

domains:
  - UI Design
  - Interaction Design
  - Search UX
  - Responsive Design

aliases: []

alternative_names:
  - Filter Pill

short_definition: >
  Contrôle compact permettant d'activer ou désactiver rapidement un filtre.

definition: >
  Un Filter Chip est un contrôle interactif compact utilisé pour exposer
  directement des critères de filtrage fréquemment utilisés.

plain_language_explanation: >
  Petit contrôle cliquable permettant de filtrer une liste sans ouvrir un
  panneau de filtres complet.

purpose: >
  Réduire le coût d'interaction associé au filtrage.

user_goal: >
  Affiner rapidement les résultats.

problem_solved: >
  Éviter de cacher tous les filtres dans une interface secondaire.

anatomy:
  - name: container
    required: true
    description: Surface interactive.

  - name: label
    required: true
    description: Nom du critère.

  - name: leading_icon
    required: false
    description: Icône aidant à identifier le filtre.

  - name: selection_indicator
    required: false
    description: Indique que le filtre est actif.

states:
  - id: default
    name: Default

  - id: hover
    name: Hover

  - id: focus
    name: Focus

  - id: selected
    name: Selected

  - id: disabled
    name: Disabled

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

data_behavior:
  update_mode: immediate
  optimistic: conditional

loading_behavior:
  expected: conditional
  recommended_feedback:
    - skeleton
    - inline-spinner

empty_state_behavior:
  possible: true
  recovery_actions:
    - clear-filters
    - remove-filter

use_when:
  - Les filtres sont fréquemment utilisés.
  - Les critères doivent rester visibles.
  - Les labels sont courts.
  - La sélection doit être rapide.

avoid_when:
  - Il existe énormément de filtres.
  - Les filtres possèdent plusieurs niveaux.
  - Les labels sont longs.
  - Une interface avancée est nécessaire.

decision_rules:
  ideal_conditions:
    - low_option_count
    - high_interaction_frequency
    - high_discoverability_requirement

  warning_conditions:
    - limited_mobile_space

  disqualifying_conditions:
    - very_high_option_count
    - deep_filter_hierarchy

content_guidelines:
  label_style: concise
  recommended_length: short
  examples_good:
    - En stock
    - Gratuit
    - Nouveau
  examples_bad:
    - Afficher uniquement les éléments actuellement disponibles

relationships:
  parent:
    - chip

  commonly_confused_with:
    - badge
    - tag
    - toggle-button
    - segmented-control

  alternatives_to:
    - checkbox
    - select
    - filter-panel

  used_with:
    - search-field
    - bottom-sheet
    - result-list

responsive:
  mobile:
    behavior: show_priority_filters
    alternatives:
      - horizontal-scroll
      - bottom-sheet

  desktop:
    behavior: inline-or-wrap

accessibility:
  semantic_role: depends_on_behavior
  native_element: button_or_checkbox
  keyboard: required
  focus: visible
  color_independence: required

visuals:
  isolated:
    status: to_create

  contextual:
    status: to_create

  comparison:
    status: to_create

search:
  keywords:
    - filter
    - chip
    - quick-filter

  natural_language_queries:
    - petits boutons pour filtrer
    - filtres rapides
    - filtres sous une recherche

  intents:
    - filter-results
    - quick-selection

tags:
  - filtering
  - selection
  - search
  - mobile

ai:
  short_prompt: >
    Utilise des Filter Chips pour exposer les filtres rapides.

  detailed_prompt: >
    Ajoute des Filter Chips sous la barre de recherche avec sélection multiple,
    états visuels distincts, accessibilité clavier et comportement responsive.

  audit_prompt: >
    Vérifie si l'utilisation des Filter Chips est pertinente dans cette interface.

  comparison_prompt: >
    Compare Filter Chips, Checkboxes, Segmented Control et Filter Panel.

  visual_prompt: >
    Crée un visuel pédagogique montrant les principaux états d'un Filter Chip.
```

---

# 67. Modèle logique final

La fiche doit pouvoir alimenter automatiquement :

```text
Concept
↓
Recherche
↓
Page détaillée
↓
Comparateur
↓
Moteur de recommandation
↓
Fiche mémo
↓
Prompt Builder
```

---

# 68. Règle de source de vérité

Une information ne doit être stockée qu'une fois.

Exemple :

La définition d'un `Filter Chip` ne doit pas être copiée séparément dans :

- la page détaillée ;
- la fiche mémo ;
- le comparateur ;
- le générateur IA.

Ces interfaces doivent toutes consommer la même donnée.

---

# 69. Principe final

Le schéma doit permettre de répondre à cinq niveaux de questions :

```text
1. Qu'est-ce que c'est ?
2. Comment cela fonctionne ?
3. Quand faut-il l'utiliser ?
4. Pourquoi le choisir plutôt qu'un autre pattern ?
5. Comment l'expliquer précisément à une IA ?
```

Le schéma universel doit donc représenter non seulement **ce qu'est un concept**, mais également **son comportement, son contexte, ses limites et ses relations avec le reste du Product Design**.