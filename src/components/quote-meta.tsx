import { standLine } from "@/lib/market";

export function QuoteMeta({ quotedAt, asOf }: { quotedAt: string | null; asOf: string }) {
  return <p className="text-xs leading-snug text-muted">{standLine(quotedAt, asOf)}</p>;
}
