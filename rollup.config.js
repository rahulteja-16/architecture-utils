
// import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const moduleName = pkg.name.replace(/^@.*\//, "");
const inputFileName = "src/index.ts";
const author = pkg.author;
const banner = `
  /**
   * @license
   * author: ${author}
   * ${moduleName}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`;

function getConfig() {
  return {
    input: inputFileName,
    plugins: [
      typescript(),
      terser(),
    ],
    output: [
      {
        name: moduleName,
        file: pkg.module,
        format: "esm",
        exports: "auto",
        banner
      },
      {
        file: pkg.main,
        format: "cjs",
        exports: "auto"
      },
    ],
  };
}

export default [
  getConfig(),
  getConfig()
];