import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "杨益的小帮手",
  description:
    "面向培训机构和家教老师的AI课后反馈生成工具，30秒生成真实、具体的家长沟通反馈",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background font-sans">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
