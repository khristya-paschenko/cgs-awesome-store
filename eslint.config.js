import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  ignores: [
    "**/node_modules/*",
    "**/dist/**",
    "expo-env.d.ts",
    "**/metro.config.js",
    "**/.prettierrc.js",
    "**/.prettierrc.cjs",
  ],
  plugins: {
    "@typescript-eslint": typescriptPlugin,
  },
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      requireConfigFile: false,
      project: [
        path.join(__dirname, "./packages/backend/tsconfig.json"),
        path.join(__dirname, "./packages/frontend/tsconfig.json"),
        path.join(__dirname, "./packages/mobile/tsconfig.json"),
      ],
      tsconfigRootDir: __dirname,
      sourceType: "module",
      ecmaVersion: 2020,
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    quotes: ["error", "single"],
  },
};
