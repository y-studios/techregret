import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Manrope } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://y-studios.github.io").replace(/\/$/, "");

const TITLE = "TechRegret（テックリグレット）｜技術乗り換え・移行理由DB";
const DESCRIPTION =
  "公式ドキュメントには載っていない、個人開発者・エンジニアが技術スタックを乗り換えた決定打を集約。移行元→移行先の比較マトリクスと後悔ログを検索・投稿できる技術選定の罠回避プラットフォーム。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "TechRegret",
  alternates: { canonical: `${SITE_URL}${BASE_PATH}/` },
  keywords: ["技術選定", "マイグレーション", "移行理由", "技術スタック", "個人開発", "エンジニア"],
  openGraph: {
    type: "website",
    siteName: "TechRegret",
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${BASE_PATH}/`,
    locale: "ja_JP",
    images: [{ url: `${BASE_PATH}/ogp.png`, width: 1200, height: 630, alt: "TechRegret" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${BASE_PATH}/ogp.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1F2937",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${noto.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
