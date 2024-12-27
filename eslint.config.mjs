import globals from "globals";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  {plugins: {
      prettier: pluginPrettier,
    }},
  {rules: {
      ...prettierConfig.rules, // Deshabilita reglas de ESLint que puedan entrar en conflicto con Prettier
      "prettier/prettier": "error", // Activa Prettier como una regla
    }},
  pluginReact.configs.flat.recommended,
];
