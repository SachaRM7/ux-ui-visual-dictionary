# UI/UX Visual Dictionary

## Objectif

Créer une encyclopédie visuelle et interactive du UI, de l’UX et du Product Design, capable de transformer une intention vague en vocabulaire précis, en comparaison de patterns et en instruction exploitable par une IA.

Le produit doit permettre de passer de :

> « Je sais à peu près ce que je veux. »

à :

> « Je sais quel composant, pattern, interaction ou style utiliser, pourquoi, et comment le demander à une IA. »

\---

## Principe central

Le produit doit suivre cette logique :

```text
Intention utilisateur
↓
Concepts candidats
↓
Explication
↓
Comparaison
↓
Choix recommandé
↓
Prompt IA
```

\---

## Documentation du projet

Les documents de cadrage sont situés dans :

```text
/docs
```

Documents principaux :

```text
01-VISION-PRODUIT.md
02-TAXONOMIE-UI-UX.md
03-SCHEMA-DES-FICHES.md
04-SOURCING-ET-DROITS.md
05-UX-DU-PRODUIT.md
06-ARCHITECTURE-TECHNIQUE.md
07-ROADMAP.md
08-FICHE-MODELE-FILTER-CHIP.md
```

\---

## Sources de vérité

### Vision produit

```text
/docs/01-VISION-PRODUIT.md
```

### Taxonomie

```text
/docs/02-TAXONOMIE-UI-UX.md
```

### Schéma des concepts

```text
/docs/03-SCHEMA-DES-FICHES.md
```

### Sourcing et droits

```text
/docs/04-SOURCING-ET-DROITS.md
```

### UX du produit

```text
/docs/05-UX-DU-PRODUIT.md
```

### Architecture technique

```text
/docs/06-ARCHITECTURE-TECHNIQUE.md
```

### Roadmap et MVP

```text
/docs/07-ROADMAP.md
```

### Fiche pilote

```text
/docs/08-FICHE-MODELE-FILTER-CHIP.md
```

\---

## Priorité du projet

Le projet doit privilégier :

```text
Qualité
>
Cohérence
>
Relations entre concepts
>
Recherche
>
Comparaison
>
Quantité de fiches
```

Il vaut mieux disposer de 30 concepts extrêmement bien structurés que de 1 000 fiches incohérentes.

\---

## MVP

Le premier vertical slice doit couvrir :

```text
Homepage
↓
Recherche
↓
Filter Chip
↓
Fiche détaillée
↓
Comparaison Filter Chip / Badge / Tag
↓
Prompt IA
```

Le MVP ne doit pas commencer par des fonctionnalités secondaires.

\---

## Hors scope initial

Ne pas implémenter immédiatement :

* authentification ;
* comptes utilisateurs ;
* paiement ;
* CMS ;
* marketplace ;
* plugin Figma ;
* extension navigateur ;
* base vectorielle ;
* système communautaire ;
* traduction complète ;
* moteur IA complexe ;
* génération de centaines de fiches.

\---

## Architecture de contenu

Le contenu doit être structuré comme des données.

Exemple :

```text
/content/concepts/filter-chip.yaml
```

Les définitions et règles UX ne doivent pas être codées directement dans les composants React.

\---

## Principe de source de vérité

Une donnée ne doit être stockée qu’une seule fois.

Exemple :

la définition de `Filter Chip` doit être enregistrée dans la base de connaissances.

Elle doit ensuite être consommée par :

```text
Page concept
Fiche mémo
Comparateur
Recherche
Prompt Builder
```

\---

## Structure cible du repository

```text
/
├── docs/
├── content/
│   └── concepts/
├── visuals/
├── app/
├── components/
├── lib/
├── types/
├── scripts/
├── public/
├── README.md
└── AGENTS.md
```

Tous les dossiers ne doivent pas forcément exister dès le premier commit.

\---

## Développement

Avant toute modification importante :

1. lire les documents de cadrage concernés ;
2. vérifier que la tâche appartient au MVP ;
3. éviter les dépendances inutiles ;
4. privilégier les composants génériques ;
5. valider les données ;
6. exécuter les tests, le typecheck et le build.

\---

## Principe directeur

Le produit ne cherche pas à devenir une simple galerie UI.

Il doit devenir une interface entre :

```text
Intention
↓
Vocabulaire Product Design
↓
Décision UX
↓
Instruction IA
```

