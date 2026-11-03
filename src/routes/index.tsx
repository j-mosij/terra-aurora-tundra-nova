import { createFileRoute } from "@tanstack/react-router";
import { App } from "@/components/mosi/App";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <App />;
}
