import Navbar from "@/components/Navbar";
import AuthProvider from "@/contexts/providers/AuthProvider";
import { dbConnect } from "@/services/dbConnect";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventry-Nextjs",
  description: "An Event app made using Next.js",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
