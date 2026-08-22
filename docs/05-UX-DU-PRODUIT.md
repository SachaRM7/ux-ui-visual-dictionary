# UX du produit

## 1. Objectif

Définir comment l'utilisateur navigue dans l'encyclopédie et comment il transforme une intention en solution UX/UI.

---

## 1.5 Vertical Slice V1

Le premier vertical slice couvre uniquement :

Homepage
→ Search Results
→ Filter Chip
→ Comparison Filter Chip / Badge / Tag
→ Prompt IA copiable

### Recherche V1

La recherche V1 est déterministe et basée sur :

- canonical name ;
- aliases ;
- alternative names ;
- keywords ;
- natural language queries ;
- tags ;
- definitions.

Elle n'utilise :

- ni embeddings ;
- ni recherche sémantique ;
- ni modèle IA.

### Recommandation V1

Aucun moteur de recommandation automatique n'est utilisé.

Les suggestions et différences entre Filter Chip, Badge et Tag sont éditoriales et stockées dans les données.

### Comparateur V1

La comparaison est statique et éditoriale.

Elle compare :

- function ;
- interaction ;
- selection ;
- role ;
- context ;
- use case.

### Prompts V1

Les prompts sont stockés avec les concepts.

Le produit permet uniquement :

- de les afficher ;
- de les copier.

Aucun appel à une IA n'est effectué dans le produit.

Le Prompt Builder avancé appartient à une phase ultérieure.

---

# 2. Principaux modes d'utilisation

Le produit doit proposer plusieurs portes d'entrée.

## Mode 1 — Je connais le terme

Recherche :

```text
Bottom Sheet

Résultat :

fiche correspondante.

Mode 2 — Je ne connais pas le terme

Recherche :

fenêtre qui remonte du bas sur mobile

Résultats :

Bottom Sheet
Action Sheet
Bottom Drawer
Mode 3 — Explorer

Navigation par catégories.

Exemple :

UI Components
→ Overlays
→ Bottom Sheet
Mode 4 — Comparer

Exemple :

Bottom Sheet vs Modal vs Drawer
Mode 5 — Construire un prompt

L'utilisateur sélectionne plusieurs concepts et obtient une instruction structurée.

3. Page d'accueil

La page d'accueil doit immédiatement proposer une recherche centrale.

Exemple :

Décris ce que tu veux faire ou cherche un terme UX/UI.

Sous la recherche :

Browse Components
Browse Patterns
Compare
Build a Prompt
4. Recherche

La recherche doit supporter :

nom exact ;
synonymes ;
descriptions ;
intention naturelle ;
catégories ;
tags.
5. Résultats

Chaque résultat doit afficher :

nom ;
miniature ;
courte définition ;
catégorie ;
raison de la correspondance.

Exemple :

Filter Chip
UI Component · Filtering

Contrôle compact permettant d'activer ou désactiver rapidement un filtre.

Correspondance : « petits boutons pour filtrer »
6. Recherche par intention

Exemple utilisateur :

Je veux cacher les options avancées et les afficher seulement si nécessaire.

Concepts proposés :

Progressive Disclosure
Accordion
Disclosure
Advanced Settings Panel
7. Page concept

Structure recommandée :

Hero
nom ;
catégorie ;
courte définition ;
visuel principal.
Overview
rôle ;
objectif utilisateur.
Anatomy
parties du composant.
Variants
variantes.
States
états.
When to use
When not to use
Accessibility
Responsive behavior
Real-world examples
Related concepts
Don't confuse with
AI prompt
8. Fonction « À ne pas confondre avec »

Chaque page importante doit afficher les concepts similaires.

Exemple :

Badge
vs
Chip
vs
Tag

La comparaison doit expliquer :

interaction ;
fonction ;
apparence ;
contexte.
9. Comparateur

L'utilisateur peut sélectionner deux à quatre concepts.

Exemple :

Pagination
Load More
Infinite Scroll

Critères :

découvrabilité ;
navigation ;
performances ;
contexte ;
accessibilité ;
mobile ;
avantages ;
limites.
10. Moteur de recommandation

Lorsque suffisamment de contexte est disponible, le système peut proposer :

Dans ce cas, Filter Chips semble plus adapté.

Mais il doit expliquer pourquoi.

11. Navigation par intention

Ajouter une section :

Je veux…
faire choisir ;
filtrer ;
naviguer ;
afficher plus ;
afficher moins ;
confirmer ;
prévenir ;
présenter des données ;
montrer une progression ;
créer un tunnel ;
récupérer une erreur ;
augmenter une conversion.
12. Navigation par environnement

Filtres possibles :

Mobile
Desktop
Tablet
Web App
SaaS
E-commerce
Dashboard
Mobile App
13. Générateur de prompts

L'utilisateur construit son instruction par blocs.

Screen

Exemple :

Dashboard.

Goal

Réduire la charge cognitive.

Layout

Bento Grid.

Components
KPI Cards
Tabs
Filter Chips
Behavior
Sticky Filters
Progressive Disclosure
Style

Minimal Dark.

Responsive

Mobile-first.

14. Résultat

Le système produit une instruction naturelle.

Exemple :

Revois le dashboard afin de réduire sa densité visuelle. Utilise une Bento Grid asymétrique pour mettre en avant les KPI principaux. Place les filtres fréquents dans des Filter Chips et réserve les options avancées à un panneau en Progressive Disclosure.

15. Favoris

Prévoir à terme :

favoris ;
collections ;
fiches récemment consultées.
16. Parcours débutant

Un utilisateur débutant doit pouvoir explorer :

Buttons
→ Primary vs Secondary
→ CTA hierarchy
→ Related patterns
17. Parcours expert

Un utilisateur avancé doit pouvoir rechercher directement :

progressive disclosure

ou comparer plusieurs patterns.

18. Principes UX internes

Le produit lui-même doit respecter :

forte hiérarchie visuelle ;
faible charge cognitive ;
navigation cohérente ;
recherche omniprésente ;
comparaison facile ;
accessibilité ;
responsive design.
19. Éviter
pages surchargées ;
trop de texte avant les visuels ;
navigation trop profonde ;
catégories ambiguës ;
concepts sans relations ;
contenu redondant.
20. North Star UX

L'utilisateur ne doit jamais avoir besoin de connaître le vocabulaire pour utiliser le produit.

Le produit doit justement lui apprendre ce vocabulaire.