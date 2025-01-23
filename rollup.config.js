import esbuild from "rollup-plugin-esbuild";
import terser from "@rollup/plugin-terser";

const ES_OUTPUT_DIR = "es";
const isProd = process.env.NODE_ENV === "production";

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
    esbuild({
      include: /\.[jt]s?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      minify: isProd,
      target: "es2015", // default, or 'es20XX', 'esnext'
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: "tsconfig.json", // default
    }),
    terser(),
  ],
};
