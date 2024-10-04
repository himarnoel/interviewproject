import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
const manrope = Manrope({
  weight: "400",
  subsets: ["cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mobbins",
  description: "Store Securely on the Cloud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <NextTopLoader
          color="#000000"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #000000,0 0 5px #000000"
        />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          theme="colored"
          hideProgressBar
        />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
