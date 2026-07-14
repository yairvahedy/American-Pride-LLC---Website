/**
 * Filter definitions for the catalog.
 *
 * Filters are declared as data so the sidebar can render them generically
 * and so new facets can be added without touching components. Only
 * "Category" is active today; Material / Color / Availability are declared
 * and rendered as disabled until product data carries those fields.
 */

import {
  productCategories,
  availabilityMeta,
  type Availability,
} from "./products";

export type FilterOption = {
  value: string;
  label: string;
  /** Optional swatch color (for the color facet). */
  swatch?: string;
};

export type FilterKey = "category" | "material" | "color" | "availability";

export type FilterGroupDef = {
  key: FilterKey;
  label: string;
  /** "checkbox" (multi) or "radio" (single) or "swatch". */
  type: "checkbox" | "radio" | "swatch";
  options: FilterOption[];
  /** Disabled facets render greyed-out with a "coming soon" hint. */
  active: boolean;
};

const categoryOptions: FilterOption[] = productCategories.map((c) => ({
  value: c.slug,
  label: c.name,
}));

const availabilityOptions: FilterOption[] = (
  Object.keys(availabilityMeta) as Availability[]
).map((key) => ({ value: key, label: availabilityMeta[key].label }));

/**
 * The full filter set. `category` is active; the rest are placeholders
 * whose options fill in once real product data exists.
 */
export const filterGroups: FilterGroupDef[] = [
  {
    key: "category",
    label: "Category",
    type: "checkbox",
    options: categoryOptions,
    active: true,
  },
  {
    key: "material",
    label: "Material",
    type: "checkbox",
    options: [],
    active: false,
  },
  {
    key: "color",
    label: "Color",
    type: "swatch",
    options: [],
    active: false,
  },
  {
    key: "availability",
    label: "Availability",
    type: "checkbox",
    options: availabilityOptions,
    active: false,
  },
];
