import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/redaktion")({
  beforeLoad: () => {
    throw redirect({ to: "/ueber-uns", statusCode: 301 });
  },
});
