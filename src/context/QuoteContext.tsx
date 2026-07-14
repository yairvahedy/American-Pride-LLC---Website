"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";

/** Lightweight product snapshot stored in the quote (kept small for storage). */
export type QuoteProductRef = Pick<
  Product,
  "slug" | "name" | "sku" | "categorySlug"
>;

export type QuoteItem = {
  product: QuoteProductRef;
  quantity: number;
};

type QuoteState = {
  items: QuoteItem[];
  hydrated: boolean;
};

type QuoteAction =
  | { type: "hydrate"; items: QuoteItem[] }
  | { type: "add"; product: QuoteProductRef; quantity: number }
  | { type: "remove"; slug: string }
  | { type: "setQuantity"; slug: string; quantity: number }
  | { type: "clear" };

const STORAGE_KEY = "ap-quote-v1";

function reducer(state: QuoteState, action: QuoteAction): QuoteState {
  switch (action.type) {
    case "hydrate":
      return { items: action.items, hydrated: true };
    case "add": {
      const existing = state.items.find(
        (i) => i.product.slug === action.product.slug,
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.slug === action.product.slug
              ? { ...i, quantity: i.quantity + action.quantity }
              : i,
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { product: action.product, quantity: Math.max(1, action.quantity) },
        ],
      };
    }
    case "remove":
      return {
        ...state,
        items: state.items.filter((i) => i.product.slug !== action.slug),
      };
    case "setQuantity":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.slug === action.slug
              ? { ...i, quantity: Math.max(1, action.quantity) }
              : i,
          )
          .filter((i) => i.quantity > 0),
      };
    case "clear":
      return { ...state, items: [] };
    default:
      return state;
  }
}

type QuoteContextValue = {
  items: QuoteItem[];
  /** Distinct line items. */
  count: number;
  /** Sum of all quantities. */
  totalQuantity: number;
  hydrated: boolean;
  isInQuote: (slug: string) => boolean;
  addItem: (product: QuoteProductRef, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], hydrated: false });

  // Load persisted quote after mount (avoids SSR hydration mismatch).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const items = raw ? (JSON.parse(raw) as QuoteItem[]) : [];
      dispatch({ type: "hydrate", items: Array.isArray(items) ? items : [] });
    } catch {
      dispatch({ type: "hydrate", items: [] });
    }
  }, []);

  // Persist on change (once hydrated).
  useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [state.items, state.hydrated]);

  const value = useMemo<QuoteContextValue>(
    () => ({
      items: state.items,
      count: state.items.length,
      totalQuantity: state.items.reduce((sum, i) => sum + i.quantity, 0),
      hydrated: state.hydrated,
      isInQuote: (slug) => state.items.some((i) => i.product.slug === slug),
      addItem: (product, quantity = 1) =>
        dispatch({ type: "add", product, quantity }),
      removeItem: (slug) => dispatch({ type: "remove", slug }),
      setQuantity: (slug, quantity) =>
        dispatch({ type: "setQuantity", slug, quantity }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [state],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within a QuoteProvider");
  return ctx;
}
