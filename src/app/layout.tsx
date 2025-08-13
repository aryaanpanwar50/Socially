import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import {Toaster} from "react-hot-toast"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Socially",
  description: "Social media application powered by Next.js",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en"  >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            
          >
            <div className="min-h-screen w-full relative">
              {/* Enhanced Radial Gradient Background for Light Mode */}
              <div
                className="absolute inset-0 z-0 dark:hidden"
                style={{
                  background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
                }}
              />
              
              {/* Enhanced Dark Mode Cosmic Background */}
              <div className="absolute inset-0 z-0 hidden dark:block">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.3), transparent 70%), #000000",
                  }}
                />
                {/* Additional cosmic overlay */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.2), transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15), transparent 50%)",
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <NavBar />
                <main className="py-8 pt-36">
                  {/* container to center the content */}
                  <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="hidden lg:block lg:col-span-3"><SideBar/></div>
                      <div className="lg:col-span-9">{children}</div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
            <Toaster/>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
