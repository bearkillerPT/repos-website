{
  description = "bearkillerpt.xyz, Gil Teixeira's portfolio";

  # Same channel as the Pi (bearkillerPT/raspberryConfs), which also makes this input follow its
  # nixpkgs. bun.lock is written by that nixpkgs' bun, so `--frozen-lockfile` can read it.
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";

  outputs =
    { nixpkgs, ... }:
    let
      forAllSystems =
        f:
        nixpkgs.lib.genAttrs [ "x86_64-linux" "aarch64-linux" ] (
          system: f nixpkgs.legacyPackages.${system}
        );
    in
    {
      # nix build → ./result is the site, ready for nginx
      packages = forAllSystems (pkgs: {
        default = pkgs.callPackage ./nix/package.nix { };
      });

      # nix develop → the bun and node the Pi builds with
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          packages = [
            pkgs.bun
            pkgs.nodejs
          ];
        };
      });
    };
}
