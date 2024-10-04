import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
