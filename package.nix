{
  lib,
  writeShellScriptBin,
  esbuild,
  ags,
  ...
}:
let
  name = "ags";
  src = ./.;
  dependencies = [ esbuild ];
in
writeShellScriptBin name ''
  export PATH=$PATH:${lib.makeBinPath dependencies}
  ${ags}/bin/ags -b ${name} -c ${src}/config.js $@
''
