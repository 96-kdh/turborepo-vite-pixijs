module.exports = {
   env: {
      node: true,
   },
   parser: "@typescript-eslint/parser",
   extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
   plugins: ["@typescript-eslint"],
   parserOptions: {
      sourceType: "module",
      ecmaVersion: 2020,
   },
   rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-var-requires": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
   },
};
