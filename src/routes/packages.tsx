import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages — Oryntal AI Labs" },
      {
        name: "description",
        content:
          "Niche editions from Oryntal AI Labs — a future-state vision for your industry, scaled once it's yours.",
      },
    ],
  }),
  component: PackagesLayout,
});

function PackagesLayout() {
  return <Outlet />;
}
