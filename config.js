const entry = `${App.configDir}/src/main.ts`;
const main = "/tmp/ags/main.js";

try {
  // @ts-ignore
  await Utils.execAsync([
    "esbuild",
    "--bundle",
    entry,
    "--format=esm",
    `--outfile=${main}`,
    "--external:resource://*",
    "--external:gi://*",
    "--external:file://*",
  ]);
  // @ts-ignore
  await import(`file://${main}`);
} catch (error) {
  console.error(error);
}
