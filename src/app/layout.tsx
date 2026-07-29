import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = { title: "NEXUS · Inner Orbit", description: "探索你的内在轨迹" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
