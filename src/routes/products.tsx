import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Projects — Oryntal AI Labs" },
      {
        name: "description",
        content:
          "Builds from Oryntal AI Labs — SaaS products, AI automations, and fine-tuned models, each with its own shareable link.",
      },
    ],
  }),
  component: ProductsLayout,
});

function ProductsLayout() {
  return <Outlet />;
}
