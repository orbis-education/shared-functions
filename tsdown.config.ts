import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["index.ts"],
    format: ["esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    target: "es2022"
  },
  {
    entry: ["index.ts"],
    format: ["cjs"],
    dts: true,
    sourcemap: true,
    clean: false,
    target: "es2022",
    define: {
      "import.meta": "{}"
    }
  }
]);
