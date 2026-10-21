import type { ReactNode } from "react";

export function Rubrik({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-4">
      <div>
        <p className="text-xs font-semibold tracking-widest text-pine uppercase">{kicker}</p>
        <h2 className="mt-1 text-3xl font-medium text-ink md:text-4xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}
