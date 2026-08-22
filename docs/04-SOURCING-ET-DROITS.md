# Sourcing, références et gestion des droits

## 1. Objectif

Le projet doit profiter des excellentes ressources UX/UI existantes sans les copier inutilement ni créer de dépendance juridique ou technique problématique.

---

# 2. Principe

Le produit doit suivre la logique :

```text
Sources externes
↓
Recherche
↓
Normalisation
↓
Synthèse interne
↓
Contenu pédagogique original
↓
Référence vers les sources
3. Ressources prioritaires
UX Patterns for Developers

Usage :

patterns UX ;
bonnes pratiques ;
anatomy ;
accessibilité ;
comparaisons.
The Component Gallery

Usage :

nomenclature ;
composants ;
variations entre design systems ;
synonymes ;
exemples.
Mobbin

Usage :

interfaces réelles ;
écrans ;
user flows ;
exemples contextualisés.
4. Sources officielles

Les documentations officielles doivent être privilégiées pour les règles normatives.

Exemples :

Material Design
Apple Human Interface Guidelines
Microsoft Fluent
IBM Carbon
Shopify Polaris
Atlassian Design System
Adobe Spectrum
GOV.UK Design System
5. Hiérarchie des sources

Ordre recommandé :

documentation officielle ;
standards d'accessibilité ;
design systems reconnus ;
ressources UX spécialisées ;
bibliothèques d'exemples ;
articles spécialisés.
6. Données originales

Le projet peut produire lui-même :

définitions ;
explications ;
synthèses ;
classifications ;
tableaux comparatifs ;
recommandations ;
exemples pédagogiques ;
prompts IA.
7. Contenus tiers

Avant de copier ou réhéberger :

screenshots ;
illustrations ;
textes ;
composants ;
assets ;
code ;

il faut vérifier :

licence ;
attribution ;
restrictions commerciales ;
restrictions de redistribution.
8. Principe « référence plutôt que copie »

Quand cela est possible :

Concept interne
+
Explication originale
+
Lien vers la documentation externe

plutôt que :

Copie complète d'une page externe
9. Visuels internes

Pour les visuels pédagogiques, privilégier des illustrations produites spécifiquement pour la plateforme.

Avantages :

cohérence visuelle ;
contrôle des droits ;
meilleure pédagogie ;
facilité de maintenance.
10. Trois catégories de visuels
A. Visuel pédagogique original

Créé pour le projet.

B. Exemple provenant d'un design system

Référencé selon la licence.

C. Exemple réel provenant d'un produit

Utilisé comme référence ou lien externe selon les droits.

11. Métadonnées des sources

Chaque source doit disposer de :

name:
url:
publisher:
source_type:
usage:
license:
attribution_required:
last_verified:
12. Source Type

Valeurs possibles :

official_guideline
design_system
pattern_library
component_gallery
real_world_example
research
article
standard
13. Usage

Exemples :

definition
accessibility
visual_reference
behavior
comparison
real_world_example
terminology
14. Attribution

Si une licence nécessite une attribution, celle-ci doit être conservée dans les données.

15. Licences

Ne jamais déduire :

gratuit = libre de réutilisation.

Les licences doivent être vérifiées individuellement.

Exemples fréquents :

MIT
Apache 2.0
Creative Commons
propriétaire
usage personnel uniquement
restrictions commerciales
16. Screenshots

Les screenshots provenant de produits commerciaux doivent être traités comme des références externes.

Éviter d'en faire la base permanente du produit sans analyse des droits.

17. Génération des visuels

Les exemples pédagogiques doivent idéalement suivre une charte commune.

Exemple :

même largeur de canvas ;
mêmes couleurs neutres ;
même typographie ;
mêmes espacements ;
mêmes annotations.
18. Mise à jour des sources

Certaines documentations évoluent.

Chaque source peut avoir :

last_verified:

Cela permet de contrôler les fiches anciennes.

19. Traçabilité

Lorsqu'une recommandation importante vient d'une source, il doit être possible de retrouver son origine.

20. Règle finale

Le produit doit apprendre des ressources existantes sans devenir une copie assemblée de ressources existantes.

Sa valeur doit résider dans :

la synthèse ;
la classification ;
les relations ;
les comparaisons ;
la pédagogie ;
la recherche par intention ;
la génération d'instructions.