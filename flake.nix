{
  description = "Redezeit Messung";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
  flake-utils.lib.simpleFlake {
    inherit self nixpkgs;
    name = "Redezeit Messung";
    shell = {pkgs}: pkgs.mkShell {
      packages = [pkgs.nodejs];
    };
  };
}
