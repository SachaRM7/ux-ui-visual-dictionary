# 08 — Fiche modèle : Filter Chip

## 1. Statut du document

Cette fiche constitue la **fiche pilote de référence** du projet UI/UX Visual Dictionary.

Elle sert à :

- tester le modèle éditorial ;
- tester le contrat de données V1 ;
- tester la recherche ;
- tester les relations entre concepts ;
- tester la comparaison ;
- tester les prompts IA statiques ;
- servir de modèle aux futures fiches.

Cette fiche doit respecter :

- `03-SCHEMA-DES-FICHES.md` pour le modèle conceptuel global ;
- `09-CONTRAT-DONNEES-V1.md` pour les règles réellement implémentées dans le premier vertical slice.

En cas de différence concernant la V1, `09-CONTRAT-DONNEES-V1.md` prévaut.

---

# 2. Identité

```yaml
id: filter-chip
canonical_name: Filter Chip
slug: filter-chip
status: pilot
interactive: true
```

Le statut reste `pilot` tant que :

- les visuels définitifs ne sont pas produits ;
- les sources ne sont pas entièrement validées ;
- la fiche n'a pas passé les validations éditoriales et techniques.

---

# 3. Terminologie

```yaml
aliases: []

alternative_names:
  - Filter Pill
```

## Règle

`Filter Chip` étant déjà le nom canonique, il ne doit pas apparaître dans `aliases`.

`Filter Pill` est conservé comme **appellation alternative**, et non comme synonyme canonique garanti.

Les termes suivants ne doivent pas être considérés comme synonymes :

- Badge
- Tag
- Pill
- Choice Chip
- Toggle Button
- Segmented Control

Ils peuvent être visuellement proches mais représentent des concepts ou des usages différents.

---

# 4. Classification

```yaml
category:
  primary: UI Components
  secondary: Selection Controls
  tertiary: Chips
```

---

# 5. Définition courte

Un **Filter Chip** est un contrôle interactif compact permettant d'activer ou désactiver rapidement un critère de filtrage.

---

# 6. Définition complète

Un Filter Chip permet d'exposer directement certains critères de filtrage dans l'interface afin que l'utilisateur puisse modifier rapidement les résultats sans ouvrir systématiquement un panneau de filtres complet.

Exemple :

```text
[ En stock ]
[ Livraison gratuite ]
[ Promotion ]
[ Nouveau ]
```

Lorsqu'un filtre est sélectionné :

```text
[ ✓ En stock ]
```

son état doit devenir immédiatement identifiable.

---

# 7. Explication simple

Un Filter Chip peut être compris comme un **petit filtre directement cliquable**.

Au lieu de faire :

```text
Filtres
↓
Ouvrir un panneau
↓
Trouver le filtre
↓
Le sélectionner
↓
Appliquer
```

l'utilisateur peut directement faire :

```text
[ ✓ En stock ]
```

---

# 8. Fonction UX

```yaml
purpose: >
  Permettre un filtrage rapide tout en gardant visibles les critères
  les plus importants ou les plus fréquemment utilisés.
```

Le Filter Chip permet notamment de :

- diminuer le nombre d'étapes nécessaires ;
- améliorer la découvrabilité des filtres ;
- rendre les filtres actifs visibles ;
- permettre une exploration rapide ;
- réduire la friction des filtres fréquents.

---

# 9. Objectif utilisateur

```yaml
user_goal: >
  Affiner rapidement une liste ou un ensemble de résultats selon
  un ou plusieurs critères.
```

---

# 10. Problème résolu

```yaml
problem_solved: >
  Éviter d'obliger l'utilisateur à ouvrir un panneau de filtres complexe
  pour accéder aux critères les plus fréquents.
```

---

# 11. Exemple simple

Une application de recettes possède une barre de recherche.

```text
Rechercher une recette…

[ Rapide ]
[ Végétarien ]
[ Sans gluten ]
[ Petit budget ]
```

L'utilisateur sélectionne :

```text
[ ✓ Rapide ]
[ ✓ Végétarien ]
[ Sans gluten ]
[ Petit budget ]
```

La liste est immédiatement mise à jour.

---

# 12. Anatomie

```yaml
anatomy:
  - name: container
    required: true
    description: Surface interactive du Filter Chip.

  - name: label
    required: true
    description: Texte décrivant le critère de filtrage.

  - name: leading_icon
    required: false
    description: Icône facultative aidant à identifier le filtre.

  - name: selection_indicator
    required: false
    description: Indication supplémentaire permettant de reconnaître l'état sélectionné.
```

---

# 13. Container

Le container représente la surface interactive.

Il détermine notamment :

- les dimensions ;
- le padding ;
- le radius ;
- la bordure ;
- le fond ;
- les états visuels ;
- la zone tactile.

---

# 14. Label

Le label indique clairement le critère.

Exemples adaptés :

```text
En stock
Nouveau
Promotion
Livraison gratuite
Moins de 50 €
```

Éviter :

```text
Afficher uniquement les articles actuellement disponibles en stock
```

Les Filter Chips sont adaptés aux labels courts.

---

# 15. Leading Icon

Une icône peut être ajoutée lorsqu'elle améliore réellement la compréhension.

Exemple :

```text
[ ★ Populaires ]
```

Elle ne doit pas être utilisée uniquement comme décoration.

---

# 16. Selection Indicator

L'état actif peut être renforcé avec :

- une icône ;
- une modification du background ;
- une bordure ;
- un changement typographique ;
- une combinaison de plusieurs signaux.

Exemple :

```text
[ ✓ En stock ]
```

La sélection ne doit pas dépendre uniquement d'une différence subtile de couleur.

---

# 17. Variantes V1

Les variantes sont stockées comme des objets structurés.

```yaml
variants:
  - id: text-only
    name: Text Only
    description: Filter Chip composé uniquement d'un label.

  - id: leading-icon
    name: Leading Icon
    description: Filter Chip comprenant une icône avant le label.

  - id: selected-indicator
    name: Selected Indicator
    description: Filter Chip affichant un indicateur explicite lorsqu'il est sélectionné.

  - id: filled
    name: Filled
    description: Variante utilisant une surface pleine.

  - id: outlined
    name: Outlined
    description: Variante principalement définie par une bordure.
```

La forme exacte dépend du design system utilisé.

La fonction doit toujours rester prioritaire sur le style.

---

# 18. États V1

```yaml
states:
  - id: default
    name: Default
    description: Filtre disponible mais non actif.

  - id: hover
    name: Hover
    description: État affiché lorsqu'un pointeur survole le contrôle.

  - id: focus
    name: Focus
    description: État visible lorsque le composant reçoit le focus clavier.

  - id: active
    name: Active
    description: État temporaire pendant l'activation du contrôle.

  - id: selected
    name: Selected
    description: Le filtre est actuellement actif.

  - id: disabled
    name: Disabled
    description: Le filtre est présent mais indisponible.
```

---

# 19. Default

Exemple :

```text
[ Livraison gratuite ]
```

Le filtre est disponible mais inactif.

---

# 20. Hover

Le hover doit fournir un retour visuel indiquant que l'élément est interactif.

Cet état concerne principalement les interfaces utilisant un pointeur.

---

# 21. Focus

Le focus clavier doit être clairement visible.

Il ne doit jamais être supprimé simplement pour des raisons esthétiques.

---

# 22. Active

État temporaire correspondant notamment :

- au clic ;
- au tap ;
- à l'activation clavier.

---

# 23. Selected

Exemple :

```text
[ ✓ Livraison gratuite ]
```

La sélection doit être immédiatement identifiable.

---

# 24. Disabled

Un Filter Chip peut être désactivé lorsqu'une option est temporairement indisponible.

À utiliser avec prudence.

Si l'utilisateur ne comprend pas pourquoi le filtre est désactivé, cela crée de la confusion.

---

# 25. Modèle de sélection officiel V1

Pour le premier vertical slice :

```yaml
selection_model:
  type: multiple
  min_selection: 0
  max_selection: null
```

Cela signifie que plusieurs Filter Chips peuvent être actifs simultanément.

Exemple :

```text
[ ✓ Femme ]
[ ✓ En promotion ]
[ ✓ Disponible ]
```

---

# 26. Important — Single Select

Des interfaces peuvent utiliser des chips dans un contexte de sélection unique.

Cependant, **ce n'est pas le comportement pilote choisi pour la V1**.

Lorsqu'une seule option doit être sélectionnée parmi plusieurs, il faut également considérer :

- Segmented Control ;
- Radio Buttons ;
- autres patterns de choix exclusifs.

---

# 27. Modèle d'interaction officiel V1

```yaml
interaction_model:
  trigger: click_or_tap
  activation: toggle
  deactivation: toggle
  immediate_effect: true
  requires_confirmation: false
```

Le comportement V1 est donc :

```text
Clic / Tap
↓
Filter Chip activé
↓
Résultats mis à jour immédiatement
```

Aucun bouton `Appliquer` n'est utilisé dans le cas pilote.

---

# 28. Autres architectures possibles

Dans une interface de filtrage complexe, il reste possible d'utiliser :

```text
Sélection
↓
Sélection
↓
Sélection
↓
Appliquer
```

Mais ce comportement appartient à un système de filtrage plus large.

Il ne représente pas le Filter Chip pilote de la V1.

---

# 29. Quand utiliser un Filter Chip

```yaml
use_when:
  - Les filtres principaux sont fréquemment utilisés.
  - Les critères doivent rester visibles.
  - Les labels sont courts.
  - L'utilisateur doit pouvoir activer rapidement plusieurs critères.
  - L'état actuel du filtrage doit rester perceptible.
```

---

# 30. Contextes adaptés

## Recherche

```text
Recherche : chaussures

[ Femme ]
[ Homme ]
[ Running ]
[ Moins de 100 € ]
```

---

## Marketplace

```text
[ Livraison gratuite ]
[ En stock ]
[ Occasion ]
[ Promotion ]
```

---

## Streaming

```text
[ Films ]
[ Séries ]
[ Documentaires ]
[ Nouveautés ]
```

---

## Dashboard

```text
[ Aujourd'hui ]
[ Cette semaine ]
[ Actifs ]
[ En retard ]
```

---

# 31. Quand éviter un Filter Chip

```yaml
avoid_when:
  - Le nombre de filtres est très élevé.
  - Les critères nécessitent de longues descriptions.
  - Les filtres possèdent plusieurs niveaux hiérarchiques.
  - L'utilisateur doit saisir une valeur complexe.
  - La densité de Filter Chips rend l'interface difficile à scanner.
```

---

# 32. Exemple de mauvais usage

```text
[ France ]
[ Allemagne ]
[ Belgique ]
[ Espagne ]
[ Italie ]
[ Portugal ]
[ Autriche ]
[ Pays-Bas ]
[ Suède ]
[ Norvège ]
[ Finlande ]
[ Danemark ]
...
```

Une longue liste de dizaines de Filter Chips devient difficile à parcourir.

Selon le contexte, préférer :

- Select ;
- Combobox ;
- Filter Panel ;
- Search within filters.

---

# 33. Quick Filters + Advanced Filters

Pattern recommandé lorsque seuls certains filtres sont très fréquents.

```text
[ En stock ]
[ Promotion ]
[ Livraison rapide ]
[ Tous les filtres ]
```

`Tous les filtres` peut ouvrir une interface plus complète.

Sur mobile, cette interface peut par exemple prendre la forme d'un Bottom Sheet.

---

# 34. Responsive

```yaml
responsive:
  mobile:
    behavior: >
      Afficher prioritairement les filtres les plus fréquents et utiliser
      éventuellement un défilement horizontal ou une interface secondaire
      pour les filtres avancés.

  tablet:
    behavior: >
      Utiliser une ligne, un wrap limité ou une combinaison de filtres
      visibles et de filtres avancés.

  desktop:
    behavior: >
      Afficher les filtres rapides dans une toolbar, sous la recherche
      ou au-dessus des résultats.
```

---

# 35. Mobile

Exemple :

```text
[ Populaire ]
[ Récent ]
[ Prix ]
[ + Filtres ]
```

Les filtres avancés restent accessibles sans surcharger l'écran.

---

# 36. Loading

Le comportement dynamique de chargement n'appartient pas au contrat obligatoire V1 de la fiche.

Cependant, dans une implémentation réelle, si la mise à jour des résultats prend du temps, l'interface doit fournir un feedback.

Exemples :

- Skeleton ;
- Spinner discret ;
- changement d'état de la zone de résultats.

---

# 37. Empty State

L'Empty State n'est pas un bloc de données obligatoire dans le contrat V1.

Mais le pattern doit être anticipé dans une implémentation réelle.

Exemple :

```text
Aucun résultat ne correspond à ces filtres.
```

Action possible :

```text
Réinitialiser les filtres
```

---

# 38. Clear All

Lorsque plusieurs filtres sont sélectionnés, une action globale peut être pertinente.

Exemple :

```text
Filtres actifs

[ ✓ Femme ]
[ ✓ Running ]
[ ✓ Moins de 100 € ]

Tout effacer
```

---

# 39. À ne pas confondre avec

Le Filter Chip doit notamment être comparé à :

```yaml
relationships:
  parent: []

  commonly_confused_with:
    - badge
    - tag

  alternatives_to: []
  related_patterns: []
```

Pour le Vertical Slice V1, `badge` et `tag` sont les seules relations techniques vers d'autres concepts.

Les concepts suivants restent pédagogiquement pertinents mais ne doivent pas être placés dans le YAML V1 tant qu'ils ne sont pas présents dans le catalogue :

- Checkbox ;
- Segmented Control ;
- Select ;
- Filter Panel ;
- Filtering ;
- Faceted Search ;
- Progressive Disclosure.

---

# 40. Filter Chip vs Badge

## Filter Chip

Principalement :

- interactif ;
- modifie un état de filtrage ;
- peut être sélectionné/désélectionné.

Exemple :

```text
[ ✓ En stock ]
```

## Badge

Principalement :

- informatif ;
- communique un statut, un nombre ou une information courte.

Exemple :

```text
Nouveau
```

### Différence essentielle

```text
Filter Chip = contrôle

Badge = information
```

---

# 41. Filter Chip vs Tag

## Filter Chip

Permet principalement de modifier un filtre.

## Tag

Permet principalement de :

- classer ;
- catégoriser ;
- décrire un contenu.

Exemple :

```text
UX
```

Un Tag peut parfois être interactif selon le produit.

Il ne faut donc pas se baser uniquement sur l'apparence.

---

# 42. Filter Chip vs Button

Un Button déclenche généralement une action.

Exemple :

```text
[ Enregistrer ]
```

Un Filter Chip modifie généralement un état de filtrage.

Exemple :

```text
[ ✓ En promotion ]
```

---

# 43. Filter Chip vs Toggle Button

Les deux peuvent posséder un état actif/inactif.

Cependant :

**Filter Chip**

est principalement associé au filtrage.

**Toggle Button**

peut représenter un état activable dans des contextes beaucoup plus larges.

Exemple :

```text
[ Gras ]
```

dans un éditeur de texte.

---

# 44. Filter Chip vs Segmented Control

## Filter Chip

Souvent adapté à :

- plusieurs critères ;
- multi-sélection ;
- filtrage.

## Segmented Control

Souvent adapté à :

- quelques options ;
- sélection exclusive ;
- changement de vue ou de mode.

Exemple :

```text
[ Liste | Carte ]
```

---

# 45. Filter Chip vs Checkbox

Les deux peuvent représenter des choix binaires.

La Checkbox est souvent particulièrement claire pour :

- formulaires ;
- paramètres ;
- longues listes d'options.

Le Filter Chip est particulièrement adapté lorsque :

- la sélection doit être compacte ;
- les critères doivent rester visibles ;
- l'interaction doit être rapide.

---

# 46. Matrice pédagogique simple

| Situation | Pattern à considérer |
|---|---|
| Quelques filtres rapides | Filter Chips |
| Beaucoup de filtres | Filter Panel |
| Choix exclusif entre quelques modes | Segmented Control |
| Options structurées indépendantes | Checkboxes |
| Action ponctuelle | Button |
| Information non interactive | Badge ou Tag |
| Beaucoup d'options recherchables | Select / Combobox |

Cette matrice est pédagogique et ne constitue pas une règle universelle.

---

# 47. Accessibilité

Le Filter Chip n'a pas de rôle HTML natif nommé `filter-chip`.

Sa sémantique doit correspondre à son comportement réel.

Pour le pilote V1 :

```yaml
accessibility:
  semantic_role: toggle_control
  native_element: button
  keyboard:
    - Tab
    - Enter
    - Space
  focus: visible
  contrast: required
  target_size: required
  color_independence: required
```

---

# 48. Élément HTML recommandé pour le pilote

Une implémentation possible est un bouton avec état pressé.

Exemple conceptuel :

```html
<button aria-pressed="true">
  En stock
</button>
```

La sémantique finale doit toujours être vérifiée selon le comportement réellement implémenté.

---

# 49. Navigation clavier

Le Filter Chip doit être accessible au clavier.

Dans le modèle bouton :

```text
Tab
```

déplace le focus.

```text
Enter
```

ou :

```text
Space
```

active le contrôle.

---

# 50. Focus

Le focus doit être visible.

Éviter :

```text
aucun changement visible
```

Préférer un indicateur clair tel que :

- outline ;
- ring ;
- changement de bordure suffisamment contrasté.

---

# 51. Taille de cible

Les Filter Chips ne doivent pas devenir de minuscules éléments difficiles à sélectionner.

La zone interactive doit rester suffisamment grande pour :

- souris ;
- touch ;
- utilisateurs ayant des difficultés motrices.

La valeur exacte doit suivre les recommandations d'accessibilité applicables au produit.

---

# 52. Ne pas dépendre uniquement de la couleur

Mauvais :

```text
gris → légèrement bleu
```

comme seul changement.

Mieux :

```text
✓
+
background
+
border
+
color
```

selon le design system.

---

# 53. Content Guidelines

```yaml
content_guidelines:
  label_style: concise
  recommended_length: short
  grammar: consistent
  avoid:
    - phrases longues
    - labels ambigus
    - formulations incohérentes

  examples_good:
    - En stock
    - Nouveau
    - Promotion
    - Livraison gratuite

  examples_bad:
    - Afficher uniquement les produits qui sont actuellement disponibles
```

---

# 54. Cohérence grammaticale

Éviter :

```text
[ Gratuit ]
[ Livraison rapide ]
[ Produits actuellement disponibles ]
```

Préférer des groupes homogènes.

Exemple :

```text
[ Gratuit ]
[ Disponible ]
[ Nouveau ]
```

ou :

```text
[ Livraison gratuite ]
[ Livraison rapide ]
[ Livraison aujourd'hui ]
```

---

# 55. Visuel V1 obligatoire

Le premier vertical slice exige un **visuel pédagogique isolé**.

```yaml
visuals:
  isolated:
    type: educational
    asset: null
    description: >
      Rangée de Filter Chips montrant les états default, selected
      et disabled ainsi que l'anatomie principale.
```

`asset: null` est autorisé tant que :

```yaml
status: pilot
```

La fiche ne peut pas passer à :

```yaml
status: published
```

tant que l'asset réel n'existe pas.

---

# 56. Contenu du visuel isolé

Le visuel doit montrer au minimum :

```text
[ En stock ]
[ ✓ Livraison gratuite ]
[ -20 % ]
[ Nouveau ]
```

Avec plusieurs états :

- default ;
- selected ;
- disabled.

Il peut également annoter :

- Container ;
- Label ;
- Selection Indicator.

---

# 57. Style du visuel

Le visuel pédagogique doit être :

- neutre ;
- facilement lisible ;
- sans branding produit inutile ;
- cohérent avec les autres visuels de l'encyclopédie.

Le but est d'apprendre le pattern, pas de montrer une direction artistique particulière.

---

# 58. Visuels futurs

Hors V1 obligatoire :

```text
visuals.contextual
visuals.comparison
visuals.do_dont
```

Ils seront ajoutés progressivement.

---

# 59. Recherche V1

Toutes les données de recherche doivent se trouver dans le bloc :

```yaml
search:
```

et non directement à la racine.

---

# 60. Search Keywords

```yaml
search:
  keywords:
    - filter
    - chip
    - quick filter
    - filtering
```

---

# 61. Natural Language Queries

```yaml
search:
  natural_language_queries:
    - petits boutons pour filtrer
    - boutons arrondis pour filtrer
    - filtres sous une recherche
    - petits filtres cliquables
    - plusieurs boutons pour filtrer une liste
    - filtres rapides
    - boutons pour activer plusieurs critères
    - pastilles pour filtrer
    - petites bulles de filtre
    - filtres horizontaux
```

---

# 62. Tags

```yaml
search:
  tags:
    - filtering
    - selection
    - search
    - ecommerce
    - mobile
    - interaction
```

---

# 63. Requête de validation principale

La requête :

```text
petits boutons pour filtrer
```

doit retourner :

```text
Filter Chip
```

comme premier résultat dans le vertical slice V1.

---

# 64. Prompt IA court

```yaml
ai:
  short_prompt: >
    Utilise des Filter Chips pour exposer les filtres rapides et fréquemment
    utilisés. Permets une sélection multiple et rends clairement visible
    l'état actif de chaque filtre.
```

---

# 65. Prompt IA détaillé

```yaml
ai:
  detailed_prompt: >
    Ajoute une rangée de Filter Chips sous la barre de recherche pour les
    critères de filtrage les plus fréquemment utilisés.

    Autorise la sélection multiple et mets à jour les résultats immédiatement
    après chaque activation ou désactivation.

    Affiche clairement les états default, hover, focus, active, selected et
    disabled.

    Les labels doivent être courts et explicites.

    L'état selected ne doit pas dépendre uniquement de la couleur : utilise
    également un indicateur suffisamment clair comme une icône, une bordure
    ou une modification de surface.

    Sur mobile, garde les filtres prioritaires accessibles et déplace les
    options avancées vers une interface secondaire lorsqu'elles deviennent
    trop nombreuses.

    Assure une navigation clavier correcte, un focus visible et une zone
    tactile suffisante.
```

---

# 66. Comportement des prompts V1

Les prompts sont :

- statiques ;
- éditoriaux ;
- déterministes ;
- stockés dans les données ;
- copiables tels quels.

Le produit V1 n'effectue aucun appel à un modèle IA.

Le Prompt Builder dynamique appartient à une phase ultérieure.

---

# 67. Comparaison V1

Le premier vertical slice possède une comparaison éditoriale dédiée :

```text
Filter Chip
vs
Badge
vs
Tag
```

Les critères obligatoires sont :

```text
function
interaction
selection
role
context
use_case
```

La comparaison doit être stockée dans une entité `Comparison` distincte.

Elle ne doit pas être dupliquée intégralement dans cette fiche.

---

# 68. Relations V1

```yaml
relationships:
  parent: []

  commonly_confused_with:
    - badge
    - tag

  alternatives_to: []
  related_patterns: []
```

Dans le Vertical Slice V1, toute relation stockée dans `relationships` doit pointer vers un concept existant dans le catalogue.

Le catalogue V1 contient uniquement :

- `filter-chip` ;
- `badge` ;
- `tag`.

Les autres rapprochements restent documentés dans le texte pédagogique jusqu'à leur intégration future au catalogue.

---

# 69. Sources — principe

Les sources doivent être structurées.

Une simple liste de liens ou de noms dans le texte n'est pas suffisante pour une future fiche `published`.

Structure :

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

# 70. Sources pilotes

Tant que la vérification des licences et métadonnées n'a pas été finalisée, la fiche reste :

```yaml
status: pilot
```

Sources à structurer et vérifier avant publication :

```yaml
sources:
  - name: Material Design — Chips
    url: TO_VERIFY
    publisher: Google
    source_type: design_system
    usage:
      - terminology
      - interaction
      - behavior
    license: TO_VERIFY
    attribution_required: TO_VERIFY
    last_verified: null

  - name: WAI-ARIA Authoring Practices — Button Pattern
    url: TO_VERIFY
    publisher: W3C
    source_type: standard
    usage:
      - accessibility
      - interaction
    license: TO_VERIFY
    attribution_required: TO_VERIFY
    last_verified: null

  - name: WCAG 2.2
    url: TO_VERIFY
    publisher: W3C
    source_type: standard
    usage:
      - accessibility
    license: TO_VERIFY
    attribution_required: TO_VERIFY
    last_verified: null
```

Aucune de ces entrées ne doit être considérée comme prête pour publication tant que les champs `TO_VERIFY` n'ont pas été vérifiés.

---

# 71. Sources futures à explorer

La fiche pourra être enrichie avec des références provenant notamment de :

- Apple Human Interface Guidelines ;
- IBM Carbon ;
- Shopify Polaris ;
- Adobe Spectrum ;
- Atlassian Design System ;
- The Component Gallery ;
- UX pattern libraries ;
- exemples réels de produits lorsque les droits le permettent.

Ces ressources serviront notamment à analyser :

- les différences terminologiques ;
- les variantes ;
- les usages ;
- les recommandations communes ;
- les différences entre design systems.

---

# 72. Anti-patterns

```yaml
anti_patterns:
  - id: decorative-filter-chip
    description: Utiliser un Filter Chip comme simple élément décoratif.
    consequence: Le rôle interactif devient ambigu.

  - id: too-many-filter-chips
    description: Afficher un très grand nombre de Filter Chips simultanément.
    consequence: Augmente la charge cognitive et ralentit le scan.

  - id: long-labels
    description: Utiliser des labels trop longs.
    consequence: Réduit la lisibilité et augmente la densité visuelle.

  - id: invisible-selected-state
    description: Rendre l'état selected presque impossible à distinguer.
    consequence: L'utilisateur ne sait plus quels filtres sont actifs.

  - id: color-only-selection
    description: Utiliser uniquement la couleur pour indiquer la sélection.
    consequence: Problème de compréhension et d'accessibilité.

  - id: mixed-actions
    description: Mélanger dans le même groupe des filtres et des actions sans distinction.
    consequence: Rend le modèle d'interaction incohérent.
```

Ces données sont utiles éditorialement mais ne sont pas obligatoires dans le contrat technique V1.

---

# 73. Best Practices

```yaml
best_practices:
  - keep_labels_short
  - make_selection_obvious
  - expose_frequent_filters
  - group_related_filters
  - provide_visible_focus
  - support_keyboard_interaction
  - avoid_visual_overload
  - keep_advanced_filters_secondary
```

---

# 74. Exemple de scénario complet

## Situation

Une marketplace affiche des vêtements.

L'utilisateur recherche :

```text
robe
```

L'interface montre :

```text
[ Taille ]
[ En promotion ]
[ Livraison gratuite ]
[ Couleur ]
[ Tous les filtres ]
```

L'utilisateur active :

```text
[ ✓ En promotion ]
[ ✓ Livraison gratuite ]
```

Les résultats sont immédiatement mis à jour.

Les filtres avancés restent accessibles via :

```text
Tous les filtres
```

Le système combine donc :

```text
Quick Filters
+
Advanced Filters
```

---

# 75. Exemple d'erreur

Mauvaise interface :

```text
[ Femme ]
[ Homme ]
[ Rouge ]
[ Bleu ]
[ XS ]
[ S ]
[ M ]
[ L ]
[ XL ]
[ Nike ]
[ Adidas ]
[ Puma ]
[ 0–20 € ]
[ 20–40 € ]
[ 40–60 € ]
...
```

Tous les critères sont exposés au même niveau.

Conséquences :

- surcharge ;
- absence de hiérarchie ;
- difficulté de scan ;
- mauvaise expérience mobile.

Correction :

- conserver uniquement les filtres rapides ;
- déplacer les critères détaillés dans une interface secondaire.

---

# 76. Données structurées V1

Le bloc ci-dessous représente la forme de référence à utiliser lors de la création du fichier de contenu V1.

```yaml
id: filter-chip
canonical_name: Filter Chip
slug: filter-chip
status: pilot
interactive: true

category:
  primary: UI Components
  secondary: Selection Controls
  tertiary: Chips

aliases: []

alternative_names:
  - Filter Pill

short_definition: >
  Contrôle compact permettant d'activer ou désactiver rapidement
  un critère de filtrage.

definition: >
  Un Filter Chip est un contrôle interactif compact utilisé pour exposer
  directement des critères de filtrage fréquemment utilisés et permettre
  leur activation ou désactivation rapide.

purpose: >
  Permettre un filtrage rapide tout en gardant visibles les critères
  les plus importants.

user_goal: >
  Affiner rapidement une liste de résultats.

problem_solved: >
  Éviter d'ouvrir systématiquement une interface de filtrage complète
  pour les critères les plus fréquents.

variants:
  - id: text-only
    name: Text Only
    description: Filter Chip composé uniquement d'un label.

  - id: leading-icon
    name: Leading Icon
    description: Filter Chip comportant une icône avant le label.

  - id: selected-indicator
    name: Selected Indicator
    description: Filter Chip affichant un indicateur explicite de sélection.

states:
  - id: default
    name: Default
    description: Filtre disponible mais non sélectionné.

  - id: hover
    name: Hover
    description: État de survol.

  - id: focus
    name: Focus
    description: État de focus clavier.

  - id: active
    name: Active
    description: État temporaire pendant l'activation.

  - id: selected
    name: Selected
    description: Filtre actuellement actif.

  - id: disabled
    name: Disabled
    description: Filtre actuellement indisponible.

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

use_when:
  - Les filtres sont fréquemment utilisés.
  - Les critères doivent rester visibles.
  - Les labels sont courts.
  - Plusieurs critères doivent pouvoir être activés rapidement.

avoid_when:
  - Le nombre d'options est très important.
  - Les filtres possèdent plusieurs niveaux.
  - Les labels sont longs.
  - Une interface de filtrage complexe est nécessaire.

relationships:
  parent: []

  commonly_confused_with:
    - badge
    - tag

  alternatives_to: []
  related_patterns: []

visuals:
  isolated:
    type: educational
    asset: null
    description: >
      Visuel pédagogique montrant les états default, selected et disabled.

accessibility:
  semantic_role: toggle_control
  native_element: button
  keyboard:
    - Tab
    - Enter
    - Space
  focus: visible
  contrast: required
  target_size: required
  color_independence: required

responsive:
  mobile:
    behavior: >
      Afficher les filtres prioritaires et utiliser une interface secondaire
      lorsque les filtres deviennent trop nombreux.

  tablet:
    behavior: >
      Adapter l'affichage selon l'espace disponible.

  desktop:
    behavior: >
      Afficher les Quick Filters dans une zone directement accessible.

search:
  keywords:
    - filter
    - chip
    - quick filter
    - filtering

  natural_language_queries:
    - petits boutons pour filtrer
    - boutons arrondis pour filtrer
    - filtres sous une recherche
    - petits filtres cliquables
    - filtres rapides
    - pastilles pour filtrer
    - filtres horizontaux

  tags:
    - filtering
    - selection
    - search
    - ecommerce
    - mobile
    - interaction

sources:
  - name: Material Design — Chips
    url: TO_VERIFY
    publisher: Google
    source_type: design_system
    usage:
      - terminology
      - interaction
      - behavior
    license: TO_VERIFY
    attribution_required: TO_VERIFY
    last_verified: null

  - name: WAI-ARIA Authoring Practices — Button Pattern
    url: TO_VERIFY
    publisher: W3C
    source_type: standard
    usage:
      - accessibility
      - interaction
    license: TO_VERIFY
    attribution_required: TO_VERIFY
    last_verified: null

  - name: WCAG 2.2
    url: TO_VERIFY
    publisher: W3C
    source_type: standard
    usage:
      - accessibility
    license: TO_VERIFY
    attribution_required: TO_VERIFY
    last_verified: null

ai:
  short_prompt: >
    Utilise des Filter Chips pour exposer les filtres rapides et fréquemment
    utilisés. Permets une sélection multiple et rends clairement visible
    l'état actif de chaque filtre.

  detailed_prompt: >
    Ajoute une rangée de Filter Chips sous la barre de recherche pour les
    critères fréquemment utilisés. Autorise la sélection multiple et mets à
    jour les résultats immédiatement après chaque activation ou désactivation.
    Prévois des états visuels distincts, un focus clavier visible et un état
    selected ne reposant pas uniquement sur la couleur. Sur mobile, conserve
    uniquement les filtres prioritaires directement visibles et déplace les
    critères avancés vers une interface secondaire.
```

---

# 77. Ce qui est obligatoire dans le premier vertical slice

Pour `Filter Chip`, la V1 doit réellement utiliser :

```text
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

selection_model
interaction_model
accessibility

relationships

visuals.isolated

sources

search

ai.short_prompt
ai.detailed_prompt
```

---

# 78. Ce qui reste principalement éditorial pour l'instant

Certaines informations de cette fiche sont documentées mais ne doivent pas nécessairement être implémentées comme champs obligatoires immédiatement.

Exemples :

- anatomie détaillée ;
- anti-patterns ;
- best practices ;
- content guidelines ;
- empty states ;
- loading ;
- responsive avancé ;
- matrices de décision ;
- exemples réels ;
- visuels contextuels ;
- visuels Do / Don't.

Elles restent utiles pour préparer l'évolution future du produit.

---

# 79. Règles de publication

Cette fiche reste :

```yaml
status: pilot
```

jusqu'à ce que :

- le visuel isolé réel existe ;
- les sources soient structurées et vérifiées ;
- les licences soient renseignées ;
- les relations soient techniquement valides ;
- la validation du contrat V1 réussisse.

Elle pourra ensuite passer à :

```yaml
status: published
```

---

# 80. Rôle de Badge et Tag dans la V1

`Badge` et `Tag` doivent exister dans le catalogue minimal afin que :

```yaml
commonly_confused_with:
  - badge
  - tag
```

soit valide.

Ils ne nécessitent pas encore de fiches aussi détaillées que Filter Chip.

Ils doivent toutefois disposer des données minimales nécessaires à la comparaison.

---

# 81. Comparaison attendue

La comparaison V1 doit permettre à l'utilisateur de comprendre rapidement :

```text
Filter Chip
→ contrôle de filtrage interactif

Badge
→ information ou statut

Tag
→ classification ou description
```

Cette simplification sert de point de départ pédagogique.

Les nuances et exceptions pourront être documentées dans les fiches complètes futures.

---

# 82. Critères de validation de la fiche pilote

La fiche est considérée comme correctement structurée si elle permet :

1. d'identifier le concept ;
2. de comprendre sa fonction ;
3. de le retrouver depuis une formulation naturelle ;
4. de connaître son comportement interactif V1 ;
5. de voir ses principaux états ;
6. de comprendre quand l'utiliser ;
7. de comprendre quand l'éviter ;
8. de le différencier de Badge et Tag ;
9. d'afficher un visuel pédagogique ;
10. de consulter ses sources ;
11. de copier un prompt IA ;
12. d'alimenter le comparateur.

---

# 83. Critère de validation de recherche

Cette recherche :

```text
petits boutons pour filtrer
```

doit permettre d'obtenir :

```text
Filter Chip
```

comme résultat principal.

---

# 84. Critère de validation du comportement

Dans la démonstration pédagogique V1 :

```text
[ En stock ]
↓ clic
[ ✓ En stock ]
↓
résultats mis à jour
```

Puis :

```text
[ ✓ En stock ]
↓ clic
[ En stock ]
↓
filtre supprimé
```

Plusieurs filtres peuvent être actifs simultanément.

---

# 85. Critère de validation du prompt

L'utilisateur doit pouvoir :

```text
ouvrir Filter Chip
↓
lire le prompt
↓
copier le prompt
```

sans qu'aucun appel à un modèle IA soit effectué.

---

# 86. Rôle de cette fiche dans le projet

Cette fiche est le premier test réel de la chaîne :

```text
Knowledge Base
↓
Search
↓
Concept Page
↓
Relations
↓
Comparison
↓
AI Prompt
```

Si cette architecture fonctionne correctement avec :

```text
Filter Chip
Badge
Tag
```

elle pourra ensuite être étendue à d'autres concepts.

---

# 87. Principe final

Cette fiche ne doit pas seulement répondre :

> Qu'est-ce qu'un Filter Chip ?

Elle doit permettre de répondre successivement :

> Est-ce bien le concept que je cherchais ?

puis :

> Dans quel contexte dois-je l'utiliser ?

puis :

> Pourquoi le choisir plutôt qu'un Badge, un Tag ou un autre contrôle ?

et enfin :

> Comment formuler précisément cette intention à une IA ?

Le rôle de la fiche est donc :

**identifier → comprendre → différencier → choisir → formuler.**