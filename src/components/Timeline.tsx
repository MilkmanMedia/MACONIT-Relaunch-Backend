export function Timeline({ steps }: { steps: [string, string][] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {steps.map(([title, desc], i) => (
        <div key={title} className="relative pt-11">
          <span className="absolute left-0 top-0 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark font-extrabold text-white shadow-[0_6px_16px_-4px_rgba(204,7,30,.45)]">
            {i + 1}
          </span>
          <h4 className="text-[17px] font-bold">{title}</h4>
          <p className="text-[15px] text-grey">{desc}</p>
        </div>
      ))}
    </div>
  );
}
