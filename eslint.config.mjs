import nextVitals from "eslint-config-next/core-web-vitals";

const eslint_config = [
  ...nextVitals,
  {
    ignores: ["coverage/**"]
  }
];

export default eslint_config;
