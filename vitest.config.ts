import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";
export default defineConfig({resolve:{alias:{"@":fileURLToPath(new URL("./src",import.meta.url))}},test:{include:["src/tests/**/*.test.{ts,tsx,js,jsx}"],exclude:["e2e/**","node_modules/**"]}});
