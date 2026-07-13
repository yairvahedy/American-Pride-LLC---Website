import { Container } from "./Container";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

/**
 * Standard inner-page header banner on the brand surface. Gives every
 * non-home route a consistent, professional masthead.
 */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="border-b border-navy-700/50 bg-brand text-white">
      <Container className="py-14 sm:py-18">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-accent-200 uppercase">
            <span className="h-px w-6 bg-accent-200/60" aria-hidden />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl text-4xl text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy-100">
            {description}
          </p>
        )}
      </Container>
    </div>
  );
}
