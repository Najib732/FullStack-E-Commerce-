// app/layout.tsx
import React from "react";
import Myheader from "@/components/header";
import MyFooter from "@/components/footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">

        <Myheader />


        <main className="flex-1 p-4">{children}</main>


        <MyFooter />
      </body>
    </html>
  );
}
