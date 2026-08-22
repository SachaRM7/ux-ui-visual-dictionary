import { z } from "zod";

const KEBAB_CASE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const KebabCaseSchema = z
  .string()
  .trim()
  .min(1, "La valeur ne peut pas être vide.")
  .regex(KEBAB_CASE_PATTERN, "La valeur doit utiliser le format kebab-case.");

export const NonEmptyStringSchema = z
  .string()
  .trim()
  .min(1, "La valeur ne peut pas être vide.");

const StringListSchema = z
  .array(NonEmptyStringSchema)
  .superRefine((values, context) => {
    const seen = new Set<string>();

    values.forEach((value, index) => {
      const normalized = value.toLocaleLowerCase();
      if (seen.has(normalized)) {
        context.addIssue({
          code: "custom",
          message: "Les valeurs doivent être uniques, sans distinction de casse.",
          path: [index]
        });
      }
      seen.add(normalized);
    });
  });

const VariantSchema = z
  .object({
    id: KebabCaseSchema,
    name: NonEmptyStringSchema,
    description: NonEmptyStringSchema
  })
  .strict();

const StateSchema = z
  .object({
    id: KebabCaseSchema,
    name: NonEmptyStringSchema,
    description: NonEmptyStringSchema
  })
  .strict();

const CategoryLevelSchema = z
  .object({
    id: KebabCaseSchema,
    label: NonEmptyStringSchema
  })
  .strict();

const CategorySecondarySchema = CategoryLevelSchema.extend({
  tertiary: z.array(CategoryLevelSchema).min(1)
}).strict();

const CategoryPrimarySchema = CategoryLevelSchema.extend({
  secondary: z.array(CategorySecondarySchema).min(1)
}).strict();

export const CategoryCatalogSchema = z
  .object({
    primary: z.array(CategoryPrimarySchema).min(1)
  })
  .strict()
  .superRefine((catalog, context) => {
    const primary_ids = new Set<string>();

    catalog.primary.forEach((primary, primary_index) => {
      if (primary_ids.has(primary.id)) {
        context.addIssue({
          code: "custom",
          message: `Identifiant de catégorie primary déjà utilisé : ${primary.id}.`,
          path: ["primary", primary_index, "id"]
        });
      }
      primary_ids.add(primary.id);

      const secondary_ids = new Set<string>();
      primary.secondary.forEach((secondary, secondary_index) => {
        if (secondary_ids.has(secondary.id)) {
          context.addIssue({
            code: "custom",
            message: `Identifiant de catégorie secondary déjà utilisé sous ${primary.id} : ${secondary.id}.`,
            path: ["primary", primary_index, "secondary", secondary_index, "id"]
          });
        }
        secondary_ids.add(secondary.id);

        const tertiary_ids = new Set<string>();
        secondary.tertiary.forEach((tertiary, tertiary_index) => {
          if (tertiary_ids.has(tertiary.id)) {
            context.addIssue({
              code: "custom",
              message: `Identifiant de catégorie tertiary déjà utilisé sous ${secondary.id} : ${tertiary.id}.`,
              path: [
                "primary",
                primary_index,
                "secondary",
                secondary_index,
                "tertiary",
                tertiary_index,
                "id"
              ]
            });
          }
          tertiary_ids.add(tertiary.id);
        });
      });
    });
  });

const CategorySchema = z
  .object({
    primary: KebabCaseSchema,
    secondary: KebabCaseSchema,
    tertiary: KebabCaseSchema
  })
  .strict();

const SelectionModelSchema = z
  .object({
    type: z.enum(["none", "single", "multiple", "binary", "mixed"]),
    min_selection: z.number().int().nonnegative(),
    max_selection: z.number().int().nonnegative().nullable()
  })
  .strict()
  .superRefine((selection_model, context) => {
    if (
      selection_model.max_selection !== null &&
      selection_model.max_selection < selection_model.min_selection
    ) {
      context.addIssue({
        code: "custom",
        message: "max_selection doit être supérieur ou égal à min_selection.",
        path: ["max_selection"]
      });
    }
  });

const InteractionModelSchema = z
  .object({
    trigger: NonEmptyStringSchema,
    activation: NonEmptyStringSchema,
    deactivation: NonEmptyStringSchema,
    immediate_effect: z.boolean(),
    requires_confirmation: z.boolean()
  })
  .strict();

const AccessibilitySchema = z
  .object({
    semantic_role: NonEmptyStringSchema,
    native_element: NonEmptyStringSchema,
    keyboard: z.union([NonEmptyStringSchema, z.array(NonEmptyStringSchema).min(1)]),
    focus: NonEmptyStringSchema,
    contrast: NonEmptyStringSchema,
    target_size: NonEmptyStringSchema,
    color_independence: NonEmptyStringSchema
  })
  .strict();

const RelationshipsSchema = z
  .object({
    parent: z.array(KebabCaseSchema),
    commonly_confused_with: z.array(KebabCaseSchema),
    alternatives_to: z.array(KebabCaseSchema),
    related_patterns: z.array(KebabCaseSchema)
  })
  .strict()
  .superRefine((relationships, context) => {
    for (const [relation_name, relation_ids] of Object.entries(relationships)) {
      const unique_ids = new Set(relation_ids);
      if (unique_ids.size !== relation_ids.length) {
        context.addIssue({
          code: "custom",
          message: "Une relation ne peut pas apparaître plusieurs fois.",
          path: [relation_name]
        });
      }
    }
  });

const VisualsSchema = z
  .object({
    isolated: NonEmptyStringSchema.nullable(),
    description: NonEmptyStringSchema.optional()
  })
  .strict();

const SOURCE_TYPES = [
  "official_guideline",
  "design_system",
  "pattern_library",
  "component_gallery",
  "real_world_example",
  "research",
  "standard",
  "article"
] as const;

const IsoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "La date doit utiliser le format ISO YYYY-MM-DD.")
  .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)), {
    message: "La date doit être une date calendrier valide."
  });

const SourceSchema = z
  .object({
    name: NonEmptyStringSchema,
    url: z.union([z.string().trim().url("L'URL de la source est invalide."), z.literal("TO_VERIFY")]),
    publisher: NonEmptyStringSchema,
    source_type: z.enum(SOURCE_TYPES),
    usage: z.union([NonEmptyStringSchema, z.array(NonEmptyStringSchema).min(1)]),
    license: NonEmptyStringSchema,
    attribution_required: z.union([z.boolean(), z.literal("TO_VERIFY")]).optional(),
    last_verified: IsoDateSchema.nullable()
  })
  .strict();

const SearchSchema = z
  .object({
    keywords: StringListSchema,
    natural_language_queries: StringListSchema,
    tags: StringListSchema
  })
  .strict()
  .superRefine((search, context) => {
    const terms = [
      ...search.keywords,
      ...search.natural_language_queries,
      ...search.tags
    ];

    if (terms.length === 0) {
      context.addIssue({
        code: "custom",
        message: "La recherche doit contenir au moins un terme indexable.",
        path: ["keywords"]
      });
    }

    const seen = new Set<string>();
    for (const [field_name, values] of Object.entries(search)) {
      values.forEach((value, index) => {
        const normalized = value.toLocaleLowerCase();
        if (seen.has(normalized)) {
          context.addIssue({
            code: "custom",
            message: "Les termes de recherche doivent être uniques, sans distinction de casse.",
            path: [field_name, index]
          });
        }
        seen.add(normalized);
      });
    }
  });

const AiSchema = z
  .object({
    short_prompt: z.string().trim(),
    detailed_prompt: z.string().trim()
  })
  .strict();

const ConceptSchemaBase = z
  .object({
    id: KebabCaseSchema,
    canonical_name: NonEmptyStringSchema,
    slug: KebabCaseSchema,
    status: z.enum(["draft", "pilot", "published"]),
    interactive: z.boolean(),
    category: CategorySchema,
    short_definition: NonEmptyStringSchema,
    definition: NonEmptyStringSchema,
    purpose: NonEmptyStringSchema,
    use_when: StringListSchema,
    avoid_when: StringListSchema,
    variants: z.array(VariantSchema),
    states: z.array(StateSchema),
    relationships: RelationshipsSchema,
    visuals: VisualsSchema,
    sources: z.array(SourceSchema),
    search: SearchSchema,
    ai: AiSchema,
    aliases: StringListSchema.optional(),
    alternative_names: StringListSchema.optional(),
    user_goal: NonEmptyStringSchema.optional(),
    problem_solved: NonEmptyStringSchema.optional(),
    design_system_references: StringListSchema.optional(),
    comparisons: z.array(KebabCaseSchema).optional(),
    selection_model: SelectionModelSchema.optional(),
    interaction_model: InteractionModelSchema.optional(),
    accessibility: AccessibilitySchema.optional()
  })
  .strict();

export const ConceptSchema = ConceptSchemaBase.superRefine((concept, context) => {
  const variant_ids = concept.variants.map((variant) => variant.id);
  if (new Set(variant_ids).size !== variant_ids.length) {
    context.addIssue({
      code: "custom",
      message: "Les identifiants de variantes doivent être uniques.",
      path: ["variants"]
    });
  }

  const state_ids = concept.states.map((state) => state.id);
  if (new Set(state_ids).size !== state_ids.length) {
    context.addIssue({
      code: "custom",
      message: "Les identifiants d'états doivent être uniques.",
      path: ["states"]
    });
  }

  for (const [relation_name, relation_ids] of Object.entries(concept.relationships)) {
    if (relation_ids.includes(concept.id)) {
      context.addIssue({
        code: "custom",
        message: "Un concept ne peut pas se référencer lui-même.",
        path: ["relationships", relation_name]
      });
    }
  }

  if (concept.aliases?.some((alias) => alias.toLocaleLowerCase() === concept.canonical_name.toLocaleLowerCase())) {
    context.addIssue({
      code: "custom",
      message: "Un alias ne peut pas être identique au nom canonique.",
      path: ["aliases"]
    });
  }

  if (concept.interactive) {
    if (!concept.selection_model) {
      context.addIssue({
        code: "custom",
        message: "selection_model est obligatoire pour un concept interactif.",
        path: ["selection_model"]
      });
    }
    if (!concept.interaction_model) {
      context.addIssue({
        code: "custom",
        message: "interaction_model est obligatoire pour un concept interactif.",
        path: ["interaction_model"]
      });
    }
    if (!concept.accessibility) {
      context.addIssue({
        code: "custom",
        message: "accessibility est obligatoire pour un concept interactif.",
        path: ["accessibility"]
      });
    }
  }

  if (concept.status === "published") {
    if (concept.use_when.length === 0) {
      context.addIssue({
        code: "custom",
        message: "use_when doit contenir au moins une valeur pour une fiche publiée.",
        path: ["use_when"]
      });
    }
    if (concept.avoid_when.length === 0) {
      context.addIssue({
        code: "custom",
        message: "avoid_when doit contenir au moins une valeur pour une fiche publiée.",
        path: ["avoid_when"]
      });
    }
    if (!concept.visuals.isolated || concept.visuals.isolated === "to_create") {
      context.addIssue({
        code: "custom",
        message: "visuals.isolated doit pointer vers un asset réel pour une fiche publiée.",
        path: ["visuals", "isolated"]
      });
    }
    if (concept.sources.length === 0) {
      context.addIssue({
        code: "custom",
        message: "Une fiche publiée doit avoir au moins une source structurée.",
        path: ["sources"]
      });
    }
    concept.sources.forEach((source, source_index) => {
      if (source.url === "TO_VERIFY") {
        context.addIssue({
          code: "custom",
          message: "Une source publiée doit avoir une URL vérifiée.",
          path: ["sources", source_index, "url"]
        });
      }
      if (source.license === "TO_VERIFY") {
        context.addIssue({
          code: "custom",
          message: "La licence d'une source publiée doit être vérifiée.",
          path: ["sources", source_index, "license"]
        });
      }
      if (source.last_verified === null) {
        context.addIssue({
          code: "custom",
          message: "Une source publiée doit avoir une date de vérification.",
          path: ["sources", source_index, "last_verified"]
        });
      }
      if (source.attribution_required === "TO_VERIFY") {
        context.addIssue({
          code: "custom",
          message: "Le besoin d'attribution doit être vérifié pour une source publiée.",
          path: ["sources", source_index, "attribution_required"]
        });
      }
    });
    if (concept.ai.short_prompt.length === 0) {
      context.addIssue({
        code: "custom",
        message: "ai.short_prompt est obligatoire pour une fiche publiée.",
        path: ["ai", "short_prompt"]
      });
    }
    if (concept.ai.detailed_prompt.length === 0) {
      context.addIssue({
        code: "custom",
        message: "ai.detailed_prompt est obligatoire pour une fiche publiée.",
        path: ["ai", "detailed_prompt"]
      });
    }
  }
});

const CONCEPT_RELATION_FIELDS = [
  "parent",
  "commonly_confused_with",
  "alternatives_to",
  "related_patterns"
] as const;

export const ConceptCatalogSchema = z.array(ConceptSchema).superRefine((concepts, context) => {
  const ids = new Map<string, number>();
  const slugs = new Map<string, number>();
  const known_ids = new Set(concepts.map((concept) => concept.id));

  concepts.forEach((concept, index) => {
    const previous_id_index = ids.get(concept.id);
    if (previous_id_index !== undefined) {
      context.addIssue({
        code: "custom",
        message: `id déjà utilisé par l'élément ${previous_id_index + 1}.`,
        path: [index, "id"]
      });
    } else {
      ids.set(concept.id, index);
    }

    const previous_slug_index = slugs.get(concept.slug);
    if (previous_slug_index !== undefined) {
      context.addIssue({
        code: "custom",
        message: `slug déjà utilisé par l'élément ${previous_slug_index + 1}.`,
        path: [index, "slug"]
      });
    } else {
      slugs.set(concept.slug, index);
    }

    CONCEPT_RELATION_FIELDS.forEach((relation_name) => {
      concept.relationships[relation_name].forEach((relation_id, relation_index) => {
        if (!known_ids.has(relation_id)) {
          context.addIssue({
            code: "custom",
            message: `La relation référence un concept inexistant : ${relation_id}.`,
            path: [index, "relationships", relation_name, relation_index]
          });
        }
      });
    });
  });
});

const ComparisonCriteriaSchema = z
  .record(KebabCaseSchema, NonEmptyStringSchema)
  .superRefine((criteria, context) => {
    if (Object.keys(criteria).length === 0) {
      context.addIssue({
        code: "custom",
        message: "Chaque critère doit contenir une valeur par concept.",
        path: []
      });
    }
  });

export const ComparisonSchema = z
  .object({
    id: KebabCaseSchema,
    concepts: z.array(KebabCaseSchema).min(2, "Une comparaison doit contenir au moins deux concepts."),
    criteria: z
      .object({
        function: ComparisonCriteriaSchema,
        interaction: ComparisonCriteriaSchema,
        selection: ComparisonCriteriaSchema,
        role: ComparisonCriteriaSchema,
        context: ComparisonCriteriaSchema,
        use_case: ComparisonCriteriaSchema
      })
      .strict()
  })
  .strict()
  .superRefine((comparison, context) => {
    if (new Set(comparison.concepts).size !== comparison.concepts.length) {
      context.addIssue({
        code: "custom",
        message: "Les concepts d'une comparaison doivent être uniques.",
        path: ["concepts"]
      });
    }

    const expected = new Set(comparison.concepts);
    for (const criterion_name of Object.keys(comparison.criteria) as Array<keyof typeof comparison.criteria>) {
      const criterion = comparison.criteria[criterion_name];
      const criterion_keys = new Set(Object.keys(criterion));

      for (const concept_id of expected) {
        if (!criterion_keys.has(concept_id)) {
          context.addIssue({
            code: "custom",
            message: `Le critère doit contenir une valeur pour ${concept_id}.`,
            path: ["criteria", criterion_name, concept_id]
          });
        }
      }

      for (const concept_id of criterion_keys) {
        if (!expected.has(concept_id)) {
          context.addIssue({
            code: "custom",
            message: `Le critère référence un concept absent de la comparaison : ${concept_id}.`,
            path: ["criteria", criterion_name, concept_id]
          });
        }
      }
    }
  });

export type ConceptInput = z.input<typeof ConceptSchema>;
export type Concept = z.output<typeof ConceptSchema>;
export type ConceptCatalog = z.output<typeof ConceptCatalogSchema>;
export type CategoryCatalog = z.output<typeof CategoryCatalogSchema>;
export type Category = z.output<typeof CategorySchema>;
export type ComparisonInput = z.input<typeof ComparisonSchema>;
export type Comparison = z.output<typeof ComparisonSchema>;

export { IsoDateSchema, SOURCE_TYPES };
