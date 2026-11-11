# The static site, ready for nginx's `root`, with the CV built into it as cv.pdf.
#
# `bun install` is the only step that needs the network, so it runs in a fixed-output
# derivation (node_modules below), and the Vite build then runs offline on top of it.
# When bun.lock changes, the hash below has to change too: set it to lib.fakeHash, run
# `nix build`, and paste the hash from the error.
{
  lib,
  stdenvNoCC,
  bun,
  nodejs,
  typst,
  roboto,
  source-sans,
  font-awesome,
}:
let
  packageJson = lib.importJSON ../package.json;
  inherit (packageJson) version;

  # The CV (cv/cv.typ): Typst, its template and its fonts all come from nixpkgs, so it builds
  # offline. The template version here must match the @preview import in cv/cv.typ.
  typstWithTemplate = typst.withPackages (ps: [ ps.brilliant-cv_4_0_1 ]);
  cvFonts = lib.makeSearchPath "share/fonts" [
    roboto
    source-sans
    font-awesome
  ];

  node_modules = stdenvNoCC.mkDerivation {
    pname = "repos-website-node-modules";
    inherit version;

    src = lib.fileset.toSource {
      root = ../.;
      fileset = lib.fileset.unions [
        ../package.json
        ../bun.lock
      ];
    };

    nativeBuildInputs = [ bun ];

    dontConfigure = true;

    buildPhase = ''
      runHook preBuild
      export HOME=$TMPDIR
      # Every platform's native binaries (Tailwind's oxide, Rolldown, the TypeScript compiler),
      # so the hash is the same on the Pi (aarch64) and in the VM test (x86_64)
      bun install --frozen-lockfile --ignore-scripts --no-progress --os='*' --cpu='*'
      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall
      mkdir -p $out
      cp -R node_modules $out/
      runHook postInstall
    '';

    # Store paths can't appear in a fixed output, and there's nothing to patch yet
    dontFixup = true;

    outputHashMode = "recursive";
    outputHashAlgo = "sha256";
    outputHash = "sha256-W/TL10+kigeDu1qGv4pf39tlhnyStNz0qsJi8LyE4Tw=";
  };
in
stdenvNoCC.mkDerivation {
  pname = "repos-website";
  inherit version;

  src = lib.fileset.toSource {
    root = ../.;
    fileset = lib.fileset.unions [
      ../package.json
      ../bun.lock
      ../index.html
      ../404.html
      ../vite.config.ts
      ../tsconfig.json
      ../tsconfig.app.json
      ../tsconfig.node.json
      ../src
      ../scripts
      ../public
      ../cv/cv.typ
      ../cv/photo.jpg
    ];
  };

  nativeBuildInputs = [
    bun
    nodejs
    typstWithTemplate
  ];

  configurePhase = ''
    runHook preConfigure
    cp -R ${node_modules}/node_modules .
    chmod -R u+w node_modules
    # The tools' `#!/usr/bin/env node` doesn't exist in the build sandbox
    patchShebangs node_modules
    runHook postConfigure
  '';

  buildPhase = ''
    runHook preBuild
    export HOME=$TMPDIR TYPST_FONT_PATHS=${cvFonts}
    # public/cv.pdf first, so Vite ships it with the rest of public/
    bun run cv
    bun run build
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    cp -R dist $out
    runHook postInstall
  '';

  # The dev shell (flake.nix) uses the same Typst and fonts
  passthru = { inherit node_modules typstWithTemplate cvFonts; };

  meta = {
    description = "bearkillerpt.xyz, Gil Teixeira's portfolio";
    homepage = "https://bearkillerpt.xyz";
    platforms = lib.platforms.linux;
  };
}
