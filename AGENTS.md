# AGENTS.md

## Purpose

This file defines the rules coding agents must follow when working on the **UI/UX Visual Dictionary** repository.

The product turns vague UI/UX intentions into precise concepts, explanations, comparisons and AI-ready instructions.

The current engineering goal is the **Vertical Slice V1**, not the complete product.

---

# 1. Read the documentation first

Before changing architecture, data structures or product behavior, read the relevant Markdown files at the repository root.

Minimum V1 set:

```text
01-VISION-PRODUIT.md
03-SCHEMA-DES-FICHES.md
05-UX-DU-PRODUIT.md
06-ARCHITECTURE-TECHNIQUE.md
07-ROADMAP.md
08-FICHE-MODELE-FILTER-CHIP.md
09-CONTRAT-DONNEES-V1.md
```

When working on taxonomy, sourcing or rights, also read:

```text
02-TAXONOMIE-UI-UX.md
04-SOURCING-ET-DROITS.md
```

Do not silently override documented product decisions.

If implementation reveals a contradiction, report it before changing the product model.

---

# 2. Documentation precedence for V1

For the Vertical Slice V1, use this precedence:

1. `09-CONTRAT-DONNEES-V1.md` — technical data contract;
2. `07-ROADMAP.md` — scope and implementation order;
3. `06-ARCHITECTURE-TECHNIQUE.md` — technical approach;
4. `05-UX-DU-PRODUIT.md` — product experience;
5. `08-FICHE-MODELE-FILTER-CHIP.md` — editorial reference for Filter Chip;
6. `03-SCHEMA-DES-FICHES.md` — complete long-term conceptual schema.

`03-SCHEMA-DES-FICHES.md` is intentionally broader than V1.

Do not implement all of it during the Vertical Slice.

---

# 3. Vertical Slice V1 scope

The official path is:

```text
Homepage
→ Search Results
→ Filter Chip
→ Concept Detail
→ Comparison Filter Chip / Badge / Tag
→ Static AI Prompt
```

The only V1 concepts are:

```text
filter-chip
badge
tag
```

Filter Chip is the only concept requiring a complete editorial page in the first slice.

Badge and Tag need only the data required for identity, relations and comparison.

Do not add other concepts unless explicitly requested.

---

# 4. Explicitly excluded from the first slice

Do not implement as V1 content:

- Bottom Sheet;
- Modal;
- Button;
- generic Chip;
- Choice Chip;
- Input Chip;
- Segmented Control;
- Checkbox;
- Filter Panel.

These may appear in educational prose or future planning, but they are not V1 catalogue entities.

---

# 5. Respect the data contract

The V1 contract is:

```text
09-CONTRAT-DONNEES-V1.md
```

Content keys use:

```text
snake_case
```

IDs and slugs use:

```text
kebab-case
```

Do not introduce a second naming convention without a concrete need.

---

# 6. Content must be data-driven

Concept knowledge must live in structured content files.

Recommended structure:

```text
content/
  concepts/
    filter-chip.yaml
    badge.yaml
    tag.yaml

  comparisons/
    filter-chip-vs-badge-vs-tag.yaml
```

Do not hard-code definitions, comparisons or prompts inside React components.

Bad:

```tsx
<p>A Filter Chip is...</p>
```

Good:

```tsx
<p>{concept.definition}</p>
```

---

# 7. Generic rendering only

Do not create a special product page such as:

```text
FilterChipPage.tsx
```

Prefer a generic concept renderer such as:

```text
ConceptPage.tsx
```

The same renderer should later be able to display other valid concepts.

Filter Chip is the pilot content, not an excuse for concept-specific architecture.

---

# 8. Validate all content

Use strict TypeScript and Zod.

Invalid structured content must fail clearly.

Important validation areas:

- required fields;
- IDs and slugs;
- category values;
- variants;
- states;
- relationships;
- sources;
- visuals;
- prompts;
- interactive component requirements.

For `interactive: true`, enforce the V1 contract for:

```text
states
selection_model
interaction_model
accessibility
```

---

# 9. Relationships

V1 technical relationships may only reference IDs that exist in the V1 catalogue.

For Filter Chip, the valid V1 relation set is:

```yaml
relationships:
  parent: []

  commonly_confused_with:
    - badge
    - tag

  alternatives_to: []
  related_patterns: []
```

Do not create dangling technical references to future concepts.

Future related concepts may remain editorial prose until those concepts exist in the catalogue.

---

# 10. Search V1

The search system is deterministic and local.

Use the fields defined in `09-CONTRAT-DONNEES-V1.md`.

The required pilot query is:

```text
petits boutons pour filtrer
```

Expected first result:

```text
Filter Chip
```

The UI must expose a reason for the match.

Do not add:

- embeddings;
- semantic vector search;
- LLM search;
- external search services;
- advanced fuzzy search.

---

# 11. Comparison V1

The only required comparison is:

```text
Filter Chip
Badge
Tag
```

It is editorial and stored as structured data.

Required criteria:

```text
function
interaction
selection
role
context
use_case
```

Do not build a generative comparison engine.

Do not build an arbitrary multi-concept comparison system in V1.

---

# 12. AI prompts V1

The V1 prompt feature is not an AI runtime feature.

Prompts are:

- static;
- editorial;
- deterministic;
- stored in concept data;
- displayed;
- copied.

The V1 application must make **no model call**.

Do not implement:

- dynamic prompt generation;
- Prompt Builder;
- multi-concept prompt assembly;
- LLM API integration.

---

# 13. Filter Chip pilot behavior

The official V1 demonstration behavior is:

```yaml
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

Therefore:

- multiple filters may be active;
- click/tap toggles state;
- results update immediately;
- there is no Apply button in the pilot interaction.

Do not reinterpret this behavior from generic design-system examples.

---

# 14. Visuals V1

The required visual field is:

```text
visuals.isolated
```

Educational visuals are internal assets.

Real-world external examples are separate and are not required for the first slice.

A `pilot` concept may temporarily have no final asset.

A `published` concept must satisfy the publication rules in `09-CONTRAT-DONNEES-V1.md`.

---

# 15. External content and rights

Follow:

```text
04-SOURCING-ET-DROITS.md
```

Do not assume:

```text
free = reusable
```

Do not copy third-party screenshots, text, code or assets without verifying reuse conditions.

Prefer original educational visuals.

V1 source verification uses:

```text
last_verified
```

---

# 16. Architecture

Keep V1 architecture minimal.

Recommended stack:

```text
Next.js
React
TypeScript
Zod
```

Do not introduce initially:

- remote database;
- CMS;
- authentication;
- vector database;
- complex backend;
- microservices;
- external state-management library without need;
- AI infrastructure.

---

# 17. Dependencies

Before adding a dependency:

1. confirm the existing stack cannot reasonably solve the problem;
2. explain the value of the dependency;
3. consider maintenance cost;
4. consider bundle impact.

Do not add dependencies solely for convenience.

---

# 18. Accessibility

Accessibility is a V1 requirement.

Use:

- semantic HTML;
- native controls where possible;
- visible focus;
- keyboard navigation;
- accessible names;
- appropriate contrast;
- responsive layouts.

Do not use ARIA when native semantics already solve the problem.

---

# 19. Responsive design

The Vertical Slice must be usable on:

```text
mobile
tablet
desktop
```

The comparison must remain understandable on small screens.

Do not build desktop-only interactions.

---

# 20. Testing priorities

Prioritize tests for:

```text
content parsing
Zod validation
search ranking
relationship resolution
comparison completeness
prompt display/copy
```

At minimum verify:

```text
filter chip
```

and:

```text
petits boutons pour filtrer
```

both return Filter Chip first.

---

# 21. Verification before completion

Before marking a coding task complete, run the relevant checks:

```text
lint
typecheck
tests
build
```

Do not claim completion when known checks fail.

If a check cannot be run, state why.

---

# 22. No concept-specific hacks

Avoid logic such as:

```ts
if (concept.slug === "filter-chip") {
  // special rendering
}
```

unless the behavior is genuinely modeled as concept data.

Prefer generic metadata-driven behavior.

---

# 23. No premature future work

The architecture may eventually support:

- 20–30 initial concepts;
- hundreds of later concepts;
- richer comparisons;
- semantic search;
- AI-assisted discovery;
- Prompt Builder;
- multiple languages.

Do not implement these capabilities before the documented roadmap reaches them.

Future extensibility means clean boundaries, not speculative infrastructure.

---

# 24. Current engineering priority

The first milestone is:

> prove that structured concept data can be validated, loaded, searched and rendered generically.

Then prove:

> Filter Chip can be compared with Badge and Tag and provide a static copyable prompt.

The first pilot concepts are exactly:

```text
Filter Chip
Badge
Tag
```

Bottom Sheet and Modal belong to later catalogue expansion, not the Vertical Slice.

---

# 25. Official implementation order

Follow `07-ROADMAP.md`.

High-level order:

```text
Project setup
↓
Zod V1 contract
↓
Content loader
↓
Filter Chip
↓
Badge
↓
Tag
↓
Comparison data
↓
Generic concept renderer
↓
Homepage / Search
↓
Comparison page
↓
Static prompt copy
↓
Accessibility / responsive
↓
Tests / build cleanup
```

Do not build the complete website in one task.

---

# 26. Definition of Done

A task is complete when:

- requested behavior works;
- V1 contract is respected;
- TypeScript is valid;
- content validation passes;
- relevant tests pass;
- build succeeds when applicable;
- no out-of-scope feature was added;
- documentation impact was considered.

---

# 27. Guiding principle

When choosing between a clever solution and a simple explicit solution, prefer the simple one.

The goal is to build a durable knowledge system, not an impressive prototype that becomes expensive to maintain.
