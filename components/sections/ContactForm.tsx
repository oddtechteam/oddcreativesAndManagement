"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { SHEET_ENDPOINT } from "@/lib/sheetEndpoint";

const budgets = ["Under ₹1L", "₹1L – 5L", "₹5L – 15L", "₹15L+"];

function Field({ label, htmlFor, children, optional }: { label: string; htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const [budget, setBudget] = useState(budgets[0]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Apps Script web apps don't return CORS headers, so the request goes
      // out as no-cors and the response can't be read; a non-throwing fetch
      // is treated as sent.
      await fetch(SHEET_ENDPOINT, { method: "POST", mode: "no-cors", body: new FormData(e.currentTarget) });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 py-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-aqua-50 text-aqua-deep">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.4} />
        </span>
        <h3 className="font-display text-3xl font-extrabold text-ink">Thanks — we&apos;ve got it.</h3>
        <p className="text-muted">We&apos;ll reply within one business day, usually faster.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <input type="hidden" name="formType" value="contact" />
      <input type="hidden" name="budget" value={budget} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="cf-name">
          <input id="cf-name" required name="name" type="text" autoComplete="name" placeholder="Your name" className="input" />
        </Field>
        <Field label="Email" htmlFor="cf-email">
          <input id="cf-email" required name="email" type="email" autoComplete="email" placeholder="you@company.com" className="input" />
        </Field>
        <Field label="Mobile number" htmlFor="cf-phone">
          <input id="cf-phone" required name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" className="input" />
        </Field>
        <Field label="Company" htmlFor="cf-company" optional>
          <input id="cf-company" name="company" type="text" autoComplete="organization" placeholder="Company / brand" className="input" />
        </Field>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-semibold text-ink">Budget range</legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => (
            <button
              type="button"
              key={b}
              onClick={() => setBudget(b)}
              aria-pressed={budget === b}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                budget === b ? "border-brand bg-brand text-white" : "border-line bg-surface text-ink hover:border-brand/40"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      <Field label="Tell us about the project" htmlFor="cf-message">
        <textarea id="cf-message" required name="message" rows={5} placeholder="What are we building?" className="input resize-none" />
      </Field>

      {status === "error" && (
        <p className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-deep">
          Something went wrong sending that — please try again, or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand px-7 font-semibold text-white shadow-glow transition-all hover:brightness-110 disabled:opacity-60 sm:w-fit"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
      </button>
    </form>
  );
}
