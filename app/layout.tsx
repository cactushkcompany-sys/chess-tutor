import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "国际象棋小导师 - 从零开始学国际象棋",
  description: "友好、耐心的国际象棋教学应用，用语音和鼓励帮你爱上国际象棋",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
