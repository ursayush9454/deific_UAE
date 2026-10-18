import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  highlight,
  description,
  centered = true,
  className,
}: SectionHeadingProps) {
  const fullTitle = highlight
    ? title.replace(highlight, `<span class="text-red-700">${highlight}</span>`)
    : title;

  return (
    <div className={cn(centered ? "text-center" : "", "mb-12", className)}>
      {label && (
        <span className="inline-block rounded-full border border-red-200 bg-red-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-700 mb-4">
          {label}
        </span>
      )}
      <h2
        className="text-3xl font-bold sm:text-4xl"
        dangerouslySetInnerHTML={{ __html: fullTitle }}
      />
      {description && (
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
