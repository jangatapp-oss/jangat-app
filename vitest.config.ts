import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";
export default defineConfig({resolve:{alias:{"@":fileURLToPath(new URL("./src",import.meta.url))}},test:{include:["src/tests/appUrl.test.ts","src/tests/authErrors.test.ts","src/tests/env.test.ts","src/tests/learning.test.ts","src/tests/migration.test.ts","src/tests/seed.test.ts","src/tests/speechService.test.ts"],exclude:["e2e/**","node_modules/**"]}});
