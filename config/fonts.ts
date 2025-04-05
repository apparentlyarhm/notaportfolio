import {
  Fira_Code as FontMono,
  Inter as FontSans,
  DM_Sans,
  Jost,
  Crimson_Text,
  Inter, JetBrains_Mono,
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

export const codestuff = JetBrains_Mono({
  weight: ["400", "600"],
  preload: false,
});

export const crimsonserif = Crimson_Text({
  weight: ["400", "600"],
  preload: false,
});

export const inter = Inter({
  weight: ["400", "500", "600", "700"],
  preload: false,
});
