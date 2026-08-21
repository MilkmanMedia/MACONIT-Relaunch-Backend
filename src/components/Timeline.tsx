export function Timeline({ steps }: { steps: [string, string][] }) {
  return (
    <div className="grid gap-px border border-line bg-line md:grid-cols-3">
      {steps.map(([title, desc], i) => (
        <div key={title} className="group bg-white p-8 transition-colors duration-200 hover:bg-bg-alt">
          <span className="mb-3.5 block text-base font-bold text-grey-light transition-colors duration-200 group-hover:text-primary">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h4 className="text-[17px] font-bold">{title}</h4>
          <p className="text-[15px] text-grey">{desc}</p>
        </div>
      ))}
    </div>
  );
}
