import { build } from "esbuild"
import fs from 'fs'
import { solidPlugin } from 'esbuild-plugin-solid'

build({
  entryPoints: ["./src/*.tsx"],
  bundle: true,
  outdir: "bundle",
  metafile: true,
  minify: true,
  // platform: 'node',
  format: "iife",
  define: {
    "process.env.NODE_ENV": '\"production\"'
  },
  sourcemap: "external",
  plugins: [
    solidPlugin({
      solid: {
        moduleName: "@r-tui/solid",
        generate: "universal",
      },
    }),
  ],
}).then(
  r => {
    fs.writeFileSync('./bundle/metafile.json', JSON.stringify(r.metafile));
  }
).catch(() => process.exit(1))
