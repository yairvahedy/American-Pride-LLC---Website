"use client";

import { useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/icons";

export type CustomerInfo = {
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
};

const EMPTY: CustomerInfo = {
  name: "",
  company: "",
  email: "",
  phone: "",
  notes: "",
};

const fieldClass =
  "w-full rounded-btn border border-steel-300 bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-steel-400 focus-visible:border-navy-500 focus-visible:ring-2 focus-visible:ring-navy-500/25";

function Label({ htmlFor, children, required }: { htmlFor: string; children: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
      {children}
      {required && <span className="text-red-600"> *</span>}
    </label>
  );
}

/**
 * Customer information form for the quote request. Captures contact
 * details + notes with basic validation. Submission is front-end only —
 * it hands the data to `onSubmit`; email/WhatsApp delivery is wired later.
 */
export function CustomerInfoForm({
  disabled = false,
  onSubmit,
}: {
  disabled?: boolean;
  onSubmit: (info: CustomerInfo) => void;
}) {
  const [values, setValues] = useState<CustomerInfo>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  const set = (key: keyof CustomerInfo) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const next: Partial<Record<keyof CustomerInfo, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Please enter a valid email.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (validate()) onSubmit(values);
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="q-name" required>Full Name</Label>
          <input
            id="q-name"
            value={values.name}
            onChange={set("name")}
            className={cn(fieldClass, errors.name && "border-red-400")}
            autoComplete="name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="q-company">Business Name</Label>
          <input
            id="q-company"
            value={values.company}
            onChange={set("company")}
            className={fieldClass}
            autoComplete="organization"
          />
        </div>
        <div>
          <Label htmlFor="q-email" required>Email</Label>
          <input
            id="q-email"
            type="email"
            value={values.email}
            onChange={set("email")}
            className={cn(fieldClass, errors.email && "border-red-400")}
            autoComplete="email"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="q-phone">Phone</Label>
          <input
            id="q-phone"
            type="tel"
            value={values.phone}
            onChange={set("phone")}
            className={fieldClass}
            autoComplete="tel"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="q-notes">Notes</Label>
        <textarea
          id="q-notes"
          value={values.notes}
          onChange={set("notes")}
          rows={4}
          placeholder="Quantities, timelines, or anything else we should know…"
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      <Button type="submit" size="lg" fullWidth disabled={disabled}>
        Send Quote Request
        <ArrowRightIcon className="h-5 w-5" />
      </Button>
      <p className="text-center text-xs text-muted">
        We&rsquo;ll reply with wholesale pricing. No payment is taken online.
      </p>
    </form>
  );
}
