import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
export default tseslint.config({ignores:["dist","src/routes.jsx","src/pages/**","src/components/**","src/services/**","src/context/**","src/data/**","src/utils/**","src/lib/calculations.ts","src/lib/storage.ts","src/types.ts"]},js.configs.recommended,...tseslint.configs.recommended,{files:["src/**/*.{ts,tsx}"],plugins:{"react-hooks":reactHooks},rules:{...reactHooks.configs.recommended.rules,"@typescript-eslint/no-explicit-any":"off"}});
