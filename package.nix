{
  lib,
  writeShellScriptBin,
  esbuild,
  ags,
  ...
}:
let
  dependencies = [ esbuild ];
in
writeShellScriptBin "ags" ''
  export PATH=$PATH:${lib.makeBinPath dependencies}
  ${ags}/bin/ags $@
''
