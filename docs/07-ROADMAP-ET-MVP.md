# Roadmap & MVP

## 1. Objectif du document

Ce document définit :

* ce qui doit être construit en premier ;
* ce qui appartient au MVP ;
* ce qui doit être repoussé ;
* comment valider rapidement la valeur du produit ;
* dans quel ordre faire évoluer le projet.

L’objectif principal est d’éviter de construire une plateforme trop lourde avant d’avoir validé les fonctionnalités réellement utiles.

---

# 1.5 Vertical Slice 1 vs MVP élargi

Le projet distingue désormais deux périmètres.

## Vertical Slice 1

Première tranche fonctionnelle destinée à valider le cœur de la proposition de valeur.

Concepts concernés :

- Filter Chip
- Badge
- Tag

Parcours :

Homepage
→ Search
→ Filter Chip
→ Concept Detail
→ Comparison Filter Chip / Badge / Tag
→ Static AI Prompt

Cette tranche est construite avant la bibliothèque de 20 à 30 concepts.

## MVP élargi

Une fois le Vertical Slice 1 validé, le produit pourra être étendu progressivement vers la bibliothèque initiale de 20 à 30 concepts.

La cible de 20 à 30 concepts ne constitue donc plus une condition préalable au premier développement.

---
# 2. Principe directeur

Le produit ne doit pas commencer par :

* des centaines de fiches ;
* un moteur IA complexe ;
* une base de données surdimensionnée ;
* une énorme bibliothèque de screenshots ;
* plusieurs langues ;
* des comptes utilisateurs complets ;
* des fonctionnalités sociales.

La première version doit simplement prouver que cette chaîne fonctionne :

```text
Intention utilisateur
↓
Concept UX/UI correspondant
↓
Explication claire
↓
Comparaison avec les alternatives
↓
Choix pertinent
↓
Prompt IA exploitable
```

---

# 3. Question principale du MVP

Le MVP doit permettre de répondre à cette question :

> Une personne qui ne connaît pas le vocabulaire UI/UX peut-elle retrouver rapidement le bon concept et comprendre comment l’utiliser ?

Si la réponse est oui, le cœur du produit fonctionne.

---

# 4. Scope du MVP

Le MVP doit inclure cinq fonctionnalités principales.

## Fonction 1 — Explorer les concepts

L’utilisateur peut parcourir une petite bibliothèque de concepts UI/UX.

Exemples :

```text
Components
Patterns
Navigation
Layouts
```

---

## Fonction 2 — Rechercher

L’utilisateur peut rechercher :

```text
filter chip
```

mais également :

```text
petits boutons pour filtrer
```

---

## Fonction 3 — Lire une fiche

Chaque concept doit disposer d’une fiche suffisamment riche pour permettre :

* compréhension ;
* comparaison ;
* utilisation.

---

## Fonction 4 — Comparer

L’utilisateur peut comprendre la différence entre concepts similaires.

Exemple :

```text
Chip
vs
Badge
vs
Tag
```

---

## Fonction 5 — Générer une instruction IA

Chaque fiche doit fournir au minimum un prompt prêt à utiliser.

---

# 5. Concepts pilotes

Il ne faut pas essayer de couvrir toute la taxonomie immédiatement.

Le MVP doit commencer avec environ :

```text
20 à 30 concepts
```

Les concepts choisis doivent volontairement inclure des notions faciles à confondre.

---

# 6. Groupe pilote 1 — Actions

Créer :

* Button
* Primary Button
* Secondary Button
* Ghost Button
* Destructive Button
* Icon Button

Objectif :

tester la logique :

```text
parent
→ variants
→ states
```

---

# 7. Groupe pilote 2 — Chips, tags et badges

Créer :

* Chip
* Filter Chip
* Choice Chip
* Input Chip
* Badge
* Tag
* Pill

Ce groupe est extrêmement important pour le MVP.

Il permet de tester la fonctionnalité :

> À ne pas confondre avec.

---

# 8. Groupe pilote 3 — Overlays

Créer :

* Modal
* Dialog
* Drawer
* Side Panel
* Bottom Sheet
* Popover
* Tooltip

Objectif :

tester la recommandation contextuelle.

Exemple :

> J’ai besoin d’afficher des options secondaires sur mobile.

Le système doit pouvoir expliquer pourquoi :

```text
Bottom Sheet
```

peut être préférable à :

```text
Modal
```

---

# 9. Groupe pilote 4 — Navigation

Créer :

* Tabs
* Segmented Control
* Breadcrumb
* Pagination
* Bottom Navigation
* Sidebar

Objectif :

tester des composants ayant parfois une apparence proche mais des fonctions très différentes.

---

# 10. Groupe pilote 5 — UX Patterns

Créer quelques patterns non purement visuels :

* Progressive Disclosure
* Infinite Scroll
* Load More
* Empty State
* Skeleton Loading
* Optimistic Update

Cela permet de vérifier que le modèle fonctionne également pour des concepts UX abstraits.

---

# 11. Taille initiale recommandée

La première release ne doit pas dépasser environ :

```text
30 concepts détaillés
```

Ces concepts doivent être très bien documentés.

Principe :

> profondeur avant quantité.

---

# 12. Structure minimale d’une fiche MVP

Pour être publiée, chaque fiche doit contenir :

```text
Nom
Catégorie
Définition
Fonction UX
Visuel isolé
Quand utiliser
Quand éviter
Variantes
États
Concepts associés
À ne pas confondre avec
Sources
Prompt IA
```

---

# 13. Visuels MVP

Le MVP ne nécessite pas immédiatement trois visuels parfaits pour chaque concept.

Minimum obligatoire :

## Niveau 1

Un visuel pédagogique isolé.

---

## Niveau 2

Pour les concepts complexes :

un visuel comparatif.

---

## Niveau 3

Les visuels en contexte peuvent être ajoutés progressivement.

---

# 14. Recherche MVP

Le moteur de recherche V1 doit être simple.

Il peut utiliser :

```text
canonical_name
aliases
tags
definition
natural_language_queries
```

Pas besoin de modèle IA complexe au départ.

---

# 15. Exemple de recherche

Entrée :

```text
fenêtre du bas
```

La base peut contenir :

```yaml
natural_language_queries:
  - fenêtre qui monte du bas
  - panneau venant du bas
  - options qui remontent sur mobile
```

Résultat :

```text
Bottom Sheet
```

---

# 16. Recherche sémantique

La recherche sémantique avancée n’est pas obligatoire pour le premier MVP.

Elle sera ajoutée lorsqu’il existera suffisamment de contenu pour justifier son utilisation.

---

# 17. Page d’accueil MVP

La homepage doit être très simple.

Éléments principaux :

## Hero

Titre expliquant clairement le produit.

Exemple :

> Trouve le bon terme UI/UX pour ce que tu veux créer.

## Search

Champ central.

Placeholder possible :

> Décris ce que tu veux faire…

## Entrées rapides

* Components
* Patterns
* Compare
* Browse All

---

# 18. Page concept MVP

Structure recommandée :

```text
Breadcrumb

Nom
Catégorie
Définition

Visuel

À quoi ça sert

Quand l’utiliser

Quand éviter

Variantes

États

À ne pas confondre avec

Concepts associés

Prompt IA

Sources
```

---

# 19. Comparateur MVP

Le comparateur doit fonctionner avec :

```text
2 à 4 concepts
```

Exemple :

```text
Chip
Badge
Tag
```

Comparer sur :

* fonction ;
* interaction ;
* sélection ;
* rôle ;
* contexte ;
* cas d’usage.

---

# 20. Comparaisons éditoriales

Au début, les comparaisons peuvent être écrites manuellement.

Il n’est pas nécessaire de créer immédiatement un moteur automatique complexe.

Exemple :

```yaml
comparisons:
  - concept: badge
    difference: >
      A Filter Chip est interactif et modifie généralement
      un filtre, alors qu'un Badge communique principalement
      une information ou un état.
```

---

# 21. Prompt IA MVP

Chaque concept doit disposer :

## Prompt court

Exemple :

> Ajoute des Filter Chips sous la barre de recherche pour permettre une sélection rapide de plusieurs filtres.

## Prompt détaillé

Exemple :

> Ajoute une rangée horizontalement scrollable de Filter Chips sous la barre de recherche. Autorise la sélection multiple, différencie clairement les états selected et unselected et conserve une zone tactile suffisante sur mobile.

---

# 22. Prompt Builder

Le générateur complet de prompts n’est pas obligatoire dans la première release.

Une première version peut simplement permettre :

```text
Ajouter au prompt
```

sur plusieurs concepts.

Le système assemble ensuite leurs recommandations.

---

# 23. Phase 0 — Préparation

Avant de coder l’interface :

## À finaliser

* vision produit ;
* taxonomie ;
* schéma des fiches ;
* règles de sourcing ;
* architecture technique ;
* concepts pilotes.

Livrables :

```text
01-VISION-PRODUIT.md
02-TAXONOMIE-UI-UX.md
03-SCHEMA-DES-FICHES.md
04-SOURCING-ET-DROITS.md
05-UX-DU-PRODUIT.md
06-ARCHITECTURE-TECHNIQUE.md
07-ROADMAP-ET-MVP.md
08-FICHE-MODELE-FILTER-CHIP.md
```

---

# 24. Phase 1 — Prototype de données

Créer d’abord :

```text
3 à 5 fiches complètes
```

Concepts recommandés :

* Filter Chip
* Badge
* Tag
* Bottom Sheet
* Modal

Objectif :

tester le schéma de données.

---

# 25. Validation de la Phase 1

Avant de continuer, vérifier :

* Est-ce qu’un concept est correctement classé ?
* Les relations sont-elles suffisantes ?
* Les variantes sont-elles bien représentées ?
* Peut-on comparer deux concepts ?
* Le modèle fonctionne-t-il pour composants et patterns ?
* Les sources sont-elles faciles à gérer ?

Si le schéma doit changer, il faut le modifier maintenant.

---

# 26. Phase 2 — Prototype UI

Construire uniquement :

```text
Homepage
Search Results
Concept Page
Comparison Page
```

Pas besoin du reste.

---

# 27. Validation de la Phase 2

Tester plusieurs scénarios.

### Test 1

Utilisateur connaît le terme :

```text
bottom sheet
```

### Test 2

Utilisateur ne connaît pas le terme :

```text
panneau qui monte depuis le bas
```

### Test 3

Utilisateur confond deux concepts :

```text
badge ou chip ?
```

### Test 4

Utilisateur cherche une solution :

```text
comment afficher des filtres rapides ?
```

---

# 28. Phase 3 — Bibliothèque initiale

Étendre progressivement à :

```text
20 à 30 concepts
```

Créer les relations entre eux.

---

# 29. Phase 4 — Recherche améliorée

Ajouter :

* fuzzy search ;
* ranking ;
* synonymes ;
* intent matching.

---

# 30. Phase 5 — Comparaison avancée

Ajouter des critères structurés.

Exemple :

```text
Visibility
Interaction Cost
Mobile Suitability
Number of Options
Discoverability
Screen Space
Accessibility
```

---

# 31. Phase 6 — Assistant IA

Ajouter :

```text
Description utilisateur
↓
Concept detection
↓
Candidates
↓
Recommendation
```

Exemple :

> Je veux cacher les paramètres avancés et les montrer seulement lorsqu’on clique.

Résultats :

```text
Progressive Disclosure
Accordion
Disclosure Panel
```

---

# 32. Phase 7 — Prompt Builder avancé

Créer une interface permettant de sélectionner :

```text
Screen
Goal
Layout
Components
Behavior
Style
Responsive
Accessibility
```

Puis générer le prompt complet.

---

# 33. Phase 8 — Enrichissement massif

Une fois le modèle validé :

* augmenter la base de concepts ;
* ajouter davantage de sources ;
* ajouter les styles visuels ;
* enrichir les parcours UX ;
* ajouter CRO ;
* ajouter psychologie UX ;
* ajouter davantage de design systems.

---

# 34. Phase 9 — Visuels avancés

Ajouter progressivement :

* visuels contextualisés ;
* animations ;
* micro-interactions ;
* diagrammes ;
* comparaisons interactives.

---

# 35. Phase 10 — Internationalisation

Ajouter :

```text
French
English
```

Les noms UI canoniques restent généralement en anglais.

---

# 36. Fonctionnalités hors MVP

Les éléments suivants ne doivent pas ralentir le lancement initial.

## Comptes utilisateurs

Pas nécessaire au début.

## Synchronisation cloud

Pas nécessaire.

## Commentaires

Pas nécessaire.

## Communauté

Pas nécessaire.

## Marketplace

Pas nécessaire.

## Générateur de composants React

Pas nécessaire.

## Extension navigateur

À envisager plus tard.

## Plugin Figma

À envisager plus tard.

---

# 37. Backlog futur

Idées possibles après validation du produit :

* collections personnelles ;
* favoris ;
* historique ;
* export Markdown ;
* export prompt ;
* intégration Codex ;
* intégration Figma ;
* extension navigateur ;
* recherche depuis screenshot ;
* reconnaissance visuelle d’un composant ;
* recommandation à partir d’une capture d’écran ;
* audit automatique d’une interface ;
* génération d’alternatives UX ;
* graphe interactif des concepts.

---

# 38. Recherche par image — Future

Une évolution particulièrement intéressante pourrait permettre à l’utilisateur de fournir une capture d’écran.

Le système tente alors d’identifier :

```text
« Cet élément ressemble à un Segmented Control. »
```

Puis propose :

* fiche ;
* alternatives ;
* recommandations.

Ce n’est pas nécessaire pour le MVP.

---

# 39. Métriques MVP

Le produit doit être évalué sur des métriques utiles.

## Search Success Rate

Pourcentage de recherches conduisant à un résultat pertinent.

## Zero Result Rate

Nombre de recherches sans résultat.

## Concept Open Rate

Pourcentage de recherches donnant lieu à l’ouverture d’une fiche.

## Compare Usage

Nombre d’utilisations du comparateur.

## Prompt Copy Rate

Nombre de prompts copiés.

---

# 40. Signal particulièrement important

Les requêtes sans résultat doivent être enregistrées.

Exemple :

```text
« sorte de petit menu collé au bouton »
```

Ces requêtes permettent d’identifier :

* concepts manquants ;
* nouveaux synonymes ;
* descriptions naturelles à ajouter.

---

# 41. Critères de validation du MVP

Le MVP est considéré comme fonctionnel si un utilisateur peut :

### 1.

Décrire une intention sans connaître le jargon.

### 2.

Trouver au moins un concept pertinent.

### 3.

Comprendre ce concept rapidement.

### 4.

Le différencier d’une alternative.

### 5.

Voir son apparence.

### 6.

Récupérer une formulation utilisable avec une IA.

---

# 42. Critères qualitatifs

Une fiche doit permettre de répondre rapidement :

> Qu’est-ce que c’est ?

> Quand est-ce utile ?

> Quand est-ce une mauvaise idée ?

> Avec quoi est-ce souvent confondu ?

> Comment demander cela à une IA ?

---

# 43. Ordre recommandé avec Codex

Lors du démarrage du développement avec Codex :

## Étape A

Créer la structure du repository.

## Étape B

Créer les types et schémas de validation.

## Étape C

Créer cinq fiches pilotes.

## Étape D

Créer une page capable de rendre automatiquement une fiche depuis les données.

## Étape E

Créer la recherche simple.

## Étape F

Créer les relations.

## Étape G

Créer le comparateur.

## Étape H

Créer le prompt généré.

## Étape I

Seulement ensuite améliorer fortement le design.

---

# 44. Règle importante pour Codex

Ne pas commencer par :

> Fais-moi tout le site.

Préférer :

> Construis le système capable de rendre correctement une fiche selon le schéma de données.

Puis construire par itérations.

---

# 45. Premier Vertical Slice recommandé

Le premier flux complet doit être :

```text
Homepage
↓
Recherche « petits boutons pour filtrer »
↓
Filter Chip
↓
Page détaillée
↓
Comparaison Chip / Badge / Tag
↓
Prompt IA
```

Si ce parcours fonctionne correctement, le cœur du produit est validé.

---

# 46. Première fiche modèle recommandée

La première fiche détaillée devrait être :

# Filter Chip

Pourquoi :

* concept courant ;
* visuellement facile à représenter ;
* possède plusieurs états ;
* possède des variantes ;
* souvent confondu avec Badge et Tag ;
* permet une comparaison ;
* comporte des considérations responsive ;
* comporte des règles d’accessibilité ;
* peut être facilement transformé en prompt IA.

Elle constitue donc un excellent test du modèle universel de fiche.

---

# 47. Deuxième groupe de validation

Une fois Filter Chip terminé :

```text
Badge
Tag
Bottom Sheet
Modal
```

Ces cinq concepts permettent de tester presque toutes les structures importantes du système.

---

# 48. Definition of Done d’une fiche

Une fiche est terminée lorsque :

* son nom canonique est validé ;
* sa catégorie est définie ;
* sa définition est claire ;
* son objectif UX est documenté ;
* ses variantes sont renseignées ;
* ses états sont renseignés ;
* ses relations sont renseignées ;
* son visuel principal existe ;
* ses usages recommandés sont expliqués ;
* ses anti-patterns sont expliqués ;
* son accessibilité est documentée ;
* ses sources sont attachées ;
* son prompt IA est disponible.

---

# 49. Definition of Done du MVP

Le MVP est terminé lorsque :

```text
20–30 concepts
+
Recherche
+
Recherche par formulations naturelles simples
+
Pages détaillées
+
Relations
+
Comparateur
+
Prompts IA
+
Visuels pédagogiques essentiels
```

fonctionnent ensemble de façon cohérente.

---

# 50. Principe final

Ne pas mesurer l’avancement du projet au nombre de fiches créées.

Le bon indicateur est :

> À quel point le système aide-t-il quelqu’un à transformer une intention vague en décision UX/UI précise ?

Priorité absolue :

```text
Qualité
>
Cohérence
>
Relations
>
Recherche
>
Quantité
```
