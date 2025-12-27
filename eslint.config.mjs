/**
 * ESLint v9 uses Flat Config by default.
 *
 * Next.js v16+ ships `eslint-config-next` as Flat Config arrays (not legacy .eslintrc).
 * We compose the same presets we previously used:
 * - next/core-web-vitals
 * - next/typescript
 */
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

export default [
  {
    ignores: [
      "**/node_modules/**",
      ".claude/**",
      "docs/**",
      "kb/**",
      "public/**",
      "scripts/**",
      "quick-link-test.js",
      "tailwind.config.js",
    ],
  },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/prefer-as-const": "warn",
      "@next/next/no-html-link-for-pages": "warn",
      "react/no-unescaped-entities": "off",
      "prefer-const": "warn",
      "no-var": "warn",
    },
  },
];

