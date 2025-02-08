import terser from "@rollup/plugin-terser";
import typescript from '@rollup/plugin-typescript';

const ES_OUTPUT_DIR = "es";

export default {
  input: "src/index.ts",
  output: [
    {
      format: "es",
      dir: ES_OUTPUT_DIR,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
  ],
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
    }),
    terser(),
  ],
};