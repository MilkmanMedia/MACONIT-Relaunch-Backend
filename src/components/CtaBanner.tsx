import Link from "next/link";

export function CtaBanner({
  headline,
  text,
  button,
  href,
}: {
  headline: string;
  text: string;
  button: string;
  href: string;
}) {
  return (
    <div className="bg-primary px-8 py-[100px] text-center text-white">
      <h2 className="text-[clamp(28px,3.6vw,44px)] font-extrabold tracking-tight text-white">{headline}</h2>
      <p className="mx-auto mt-2 max-w-[560px] text-[17px] text-[#ffd7dc]">{text}</p>
      <Link
        href={href}
        className="mt-2.5 inline-block bg-white px-7 py-4 text-sm font-bold tracking-wide text-primary transition-all hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-lift"
      >
        {button}
      </Link>
    </div>
  );
}
