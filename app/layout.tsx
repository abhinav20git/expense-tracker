import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import RootProviders from "@/components/providers/RootProviders";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Created by Abhinav",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en"
            // className="dark"
            // style={
            //   {
            //     colorScheme:"dark"
            //   }
            // }
            >
        <body className={inter.className}>
          {/* <ThemeProvider  attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange> */}
            <Toaster richColors position="bottom-right"/>
            <RootProviders>{children}</RootProviders>
              
              {/* </ThemeProvider> */}
              </body>
      </html>
    </ClerkProvider>
  );
}
