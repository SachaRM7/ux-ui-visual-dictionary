# Vision produit — Encyclopédie visuelle UI/UX & Product Design

## 1. Nom de travail

**UX/UI Visual Dictionary & AI Design Assistant**

Le nom définitif pourra être choisi plus tard.

---

## 2. Vision

Créer une plateforme de référence complète permettant de :

- identifier un composant, un pattern ou un concept UX/UI ;
- comprendre son rôle ;
- voir à quoi il ressemble ;
- connaître ses variantes ;
- le comparer avec des concepts proches ;
- savoir quand l'utiliser ;
- savoir quand l'éviter ;
- retrouver des exemples réels ;
- transformer une intention utilisateur en vocabulaire Product Design précis ;
- générer une instruction exploitable par une IA.

Le produit doit permettre de passer de :

> « Je sais globalement ce que je veux. »

à :

> « Je sais exactement quel pattern, composant, comportement ou style demander. »

---

# 3. Problème utilisateur

Lorsqu'une personne demande à une IA :

> « Améliore l'UI et l'UX de cette page »

le résultat est souvent générique.

La principale difficulté n'est pas nécessairement un manque d'idées.

Le problème est souvent un manque de vocabulaire précis permettant d'exprimer l'intention.

L'utilisateur peut reconnaître visuellement une solution sans connaître son nom.

Exemples :

> « Je veux les petits boutons arrondis sous la recherche. »

Peut correspondre à :

- Filter Chips
- Choice Chips
- Toggle Buttons
- Segmented Controls

Autre exemple :

> « Je veux quelque chose qui remonte depuis le bas de l'écran. »

Peut correspondre à :

- Bottom Sheet
- Bottom Drawer
- Action Sheet

La plateforme doit permettre d'identifier précisément ces concepts.

---

# 4. Public cible

## Public principal

Personnes utilisant des IA pour :

- créer des sites web ;
- créer des applications ;
- modifier des interfaces ;
- travailler avec des outils de génération de code ;
- améliorer des produits numériques.

Cela inclut notamment :

- développeurs ;
- product builders ;
- entrepreneurs ;
- designers débutants ou intermédiaires ;
- no-code builders ;
- utilisateurs de Codex et autres coding agents.

## Public secondaire

- étudiants UX/UI ;
- Product Managers ;
- développeurs frontend ;
- designers souhaitant retrouver rapidement un pattern.

---

# 5. Proposition de valeur

Le produit ne doit pas être une simple bibliothèque de composants.

Sa proposition de valeur est :

> **Transformer une intention de design en vocabulaire UX/UI exploitable.**

Le système doit suivre la logique :

```text
Intention
↓
Concepts candidats
↓
Explication
↓
Comparaison
↓
Choix
↓
Application
↓
Prompt IA
6. Positionnement

Le produit se situe à l'intersection de plusieurs catégories existantes.

Pattern libraries

Exemple :

UX Patterns
Component galleries

Exemple :

The Component Gallery
UI inspiration libraries

Exemple :

Mobbin
Design systems

Exemples :

Material Design
Apple Human Interface Guidelines
Carbon
Polaris
Documentation UX
Assistant IA

Le produit ne remplace pas nécessairement ces ressources.

Il doit permettre de les connecter intelligemment.

7. Les trois rendus principaux

Le projet doit proposer trois manières complémentaires d'utiliser la même base de connaissances.

Rendu 1 — Fiches mémo

Version rapide et synthétique.

Objectifs :

apprendre ;
mémoriser ;
réviser ;
retrouver rapidement une notion.

Chaque fiche contient notamment :

nom ;
définition ;
visuel ;
fonction ;
variantes ;
états ;
différences avec les concepts voisins ;
règles principales ;
prompt IA.
Rendu 2 — Encyclopédie interactive

Version complète.

Elle permet :

navigation ;
recherche ;
exploration ;
comparaison ;
visualisation ;
découverte de concepts associés.

Chaque concept dispose d'une page détaillée.

Rendu 3 — Assistant de formulation IA

L'utilisateur décrit son intention en langage naturel.

Exemple :

« Je veux plusieurs petits boutons permettant de filtrer rapidement une liste. »

Le système identifie :

Filter Chips ;
Toggle Buttons ;
Segmented Control.

Il explique les différences et recommande éventuellement le pattern le plus pertinent.

Il peut ensuite produire un prompt tel que :

Utilise une rangée horizontale de Filter Chips sous la barre de recherche pour les filtres fréquemment utilisés. Permets une sélection multiple et affiche clairement les états selected et unselected.

8. Principes fondamentaux
8.1 Visuel avant tout

Les concepts UI sont particulièrement difficiles à comprendre sans exemples visuels.

Chaque notion doit donc idéalement disposer de :

un visuel isolé ;
un visuel en contexte ;
un visuel comparatif ou annoté.
8.2 Granularité

La plateforme ne doit pas s'arrêter aux composants génériques.

Exemple :

Button
├── Primary Button
├── Secondary Button
├── Tertiary Button
├── Ghost Button
├── Outline Button
├── Destructive Button
├── Icon Button
├── Split Button
├── Toggle Button
└── Floating Action Button
8.3 Relations entre concepts

La connaissance ne doit pas être organisée uniquement comme une liste.

Elle doit fonctionner comme un graphe.

Exemple :

Chip
↔ Badge
↔ Tag
↔ Button
↔ Segmented Control
8.4 Pédagogie

Chaque fiche doit répondre à quatre questions :

Qu'est-ce que c'est ?
À quoi ça sert ?
Quand dois-je l'utiliser ?
Pourquoi choisir ceci plutôt qu'autre chose ?
8.5 Orientation pratique

Le produit doit permettre d'utiliser immédiatement ce qui vient d'être appris.

Chaque notion doit donc pouvoir fournir une instruction utilisable avec une IA.

9. Non-objectifs

Le projet ne cherche pas à :

recréer Mobbin ;
devenir une banque gigantesque de screenshots ;
remplacer tous les design systems ;
fournir des composants frontend prêts à installer dès la première version ;
documenter tous les frameworks CSS ;
devenir un outil de prototypage.
10. Différenciation

La principale différence avec les bibliothèques existantes repose sur :

Recherche par intention

L'utilisateur n'a pas besoin de connaître le vocabulaire.

Comparaison contextuelle

Exemple :

Modal
vs
Drawer
vs
Popover
vs
Bottom Sheet
Relation entre concepts
Explication pédagogique
Génération de prompts IA
Vision transversale

Le produit relie :

UI ;
UX ;
Product Design ;
Interaction Design ;
Information Architecture ;
CRO ;
Accessibility ;
Design Systems ;
User Flows.
11. Critère de réussite

Une personne doit pouvoir arriver avec une intention vague et repartir avec :

le bon terme ;
une compréhension claire ;
un exemple visuel ;
les alternatives possibles ;
une recommandation ;
un prompt précis.
12. Principe directeur

Voir → comprendre → nommer → différencier → choisir → formuler.