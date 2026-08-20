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
    <div
      className="animate-cta-shift rounded-2xl bg-gradient-to-br from-primary-dark via-primary to-primary bg-[length:220%_220%] p-10 text-center text-white sm:p-14"
      style={{ backgroundImage: "linear-gradient(120deg, #A30518, #CC071E 45%, #E8384F 75%, #CC071E)" }}
    >
      <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{headline}</h2>
      <p className="mx-auto mt-2 max-w-lg text-red-100">{text}</p>
      <Link
        href={href}
        className="mt-6 inline-block rounded-full bg-white px-6 py-3.5 font-bold text-primary transition-all hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-lift"
      >
        {button}
      </Link>
    </div>
  );
}
