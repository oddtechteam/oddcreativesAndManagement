import Counter from "@/components/ui/Counter";
import { stats } from "@/lib/site";

export default function StatsBar({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4 ${className}`}>
      {stats.map((s) => (
        <div key={s.label} className="bg-surface px-6 py-8 text-center">
          <dt className="sr-only">{s.label}</dt>
          <dd className="font-display text-4xl font-extrabold text-ink md:text-5xl">
            <span className="text-aurora">
              <Counter value={s.value} suffix={s.suffix} />
            </span>
          </dd>
          <dd className="mt-2 text-sm font-medium text-muted">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
