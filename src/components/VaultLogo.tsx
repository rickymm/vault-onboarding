import { useColorMode } from "@/components/ui/color-mode";

export function VaultLogo() {
  const { colorMode } = useColorMode();

  const isDarkMode = colorMode === "dark";

  return (
    <img
      src={
        isDarkMode
          ? "https://cdn.prod.website-files.com/63d435c02eb920d1c2f0c1ea/6581a4b97748abf21d4008f3_white%20logo%20svg%201%20svg.svg"
          : "https://cdn.prod.website-files.com/63d435c02eb920d1c2f0c1ea/6581a50b342cd117eb593110_green%3Ablk%20SVG.svg"
      }
      alt="Vault Logo"
    />
  );
}
