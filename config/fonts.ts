import {
  Fira_Code as FontMono,
  Inter as FontSans,
  DM_Sans,
  Jost,
  Source_Code_Pro,
  Crimson_Text,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  preload: false,
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  preload: false,
});

export const headingsDM = DM_Sans({
  weight: "1000",
  preload: false,
});

export const paragraph = Jost({
  weight: ["400", "600"],
  preload: false,
});

export const codestuff = Source_Code_Pro({
  weight: ["400", "600"],
  preload: false,
});

export const crimsonserif = Crimson_Text({
  weight: ["400", "600"],
  preload: false,
});
