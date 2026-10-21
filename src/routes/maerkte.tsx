import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MarketBoard } from "@/components/market-board";
import { loadBoard } from "@/lib/feeds";
import type { BoardPayload, Group } from "@/lib/market";
import { pageMeta } from "@/lib/site";

const GROUPS = ["index", "equity", "market"] as const;

export const Route = createFileRoute("/maerkte")({
  validateSearch: (search: Record<string, unknown>): { gruppe?: Group } => {
    const value = search.gruppe;
    if (typeof value === "string" && (GROUPS as readonly string[]).includes(value)) {
      return { gruppe: value as Group };
    }
    return {};
  },
  head: () =>
    pageMeta(
      "/maerkte",
      "Märkte — vKG.capital",
      "Verzögerte Kurse und Tagesverläufe für Indizes, Aktien, Devisen und Rohstoffe. Keine Anlageberatung.",
    ),
  loader: () => loadBoard(),
  component: MaerktePage,
});

function MaerktePage() {
  const initial = Route.useLoaderData();
  const search = Route.useSearch();
  const [board, setBoard] = useState<BoardPayload>(initial);
  const [refreshing, setRefreshing] = useState(false);

  const refreshBoard = useCallback(async (manual: boolean) => {
    if (manual) setRefreshing(true);
    try {
      setBoard(await loadBoard());
    } catch {
      setBoard((current) => ({
        ...current,
        ok: false,
        message: "Die Kursquelle ist gerade nicht erreichbar.",
      }));
    } finally {
      if (manual) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      void refreshBoard(false);
    }, 60_000);
    return () => window.clearInterval(timer);
  }, [refreshBoard]);

  return (
    <MarketBoard
      board={board}
      refreshing={refreshing}
      onRefresh={() => void refreshBoard(true)}
      initialFilter={search.gruppe ?? "all"}
    />
  );
}
