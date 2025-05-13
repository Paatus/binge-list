// @ts-check
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const p = compat.extends("next/core-web-vitals", "prettier");

export default tsEslint.config(
  eslint.configs.recommended,
  tsEslint.configs.recommendedTypeChecked,
  tsEslint.configs.strictTypeChecked,
  ...p,
  prettierPlugin,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  { rules: {
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/unbound-method": "off",
  } }
);
