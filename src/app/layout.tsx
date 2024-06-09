import type { Metadata } from "next";
import { Exo_2, Orbitron, Merienda, Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Providers from "@/lib/Providers/Providers";
import { Toaster } from "sonner";

const exo2 = Exo_2({ subsets: ["latin"] });
const orbitron = Orbitron({ subsets: ["latin"] });
const merienda = Merienda({ subsets: ["latin"] });
export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flat Mate",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <>
              <Toaster position="top-center" />
              {children}
            </>
          </AppRouterCacheProvider>
        </body>
      </html>
    </Providers>
  );
}
