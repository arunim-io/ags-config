{
  writeShellScriptBin,
  esbuild,
  ags,
  ...
}:
let
  name = "arshell";
  src = ./.;
  dependencies = [ esbuild ];
in
writeShellScriptBin name ''
  export PATH=$PATH:${builtins.concatStringsSep ":" (builtins.map (p: "${p}/bin") dependencies)}
  ${ags}/bin/ags -b ${name} -c ${src}/config.js $@
''
