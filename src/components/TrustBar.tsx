import { AnimatedStat } from "./AnimatedStat";
import { Reveal } from "./Reveal";

export function TrustBar({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <Reveal as="section" className="relative overflow-hidden bg-bg-deep py-9">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(600px circle at 15% 0%, rgba(204,7,30,.16), transparent 60%)" }}
      />
      <div className="relative mx-auto grid max-w-container grid-cols-2 gap-4 px-6 text-center sm:grid-cols-5">
        {stats.map((s) => (
          <AnimatedStat key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </Reveal>
  );
}
