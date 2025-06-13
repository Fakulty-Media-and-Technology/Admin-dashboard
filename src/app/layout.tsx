import type { Metadata } from "next";
import { Inter, Manrope, Roboto } from "next/font/google";
import "./globals.css";
import { Sidebar, Header } from "@/components";
import { usePathname } from "next/navigation";
import ProviderContainer from "@/components/Provider";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'video.js/dist/video-js.css';


const inter = Roboto({
  subsets: ["latin"],
  style: "normal",
  weight: "400",
  variable: "--font-RB400",
});

export const metadata: Metadata = {
  title: "REEPLAY",
  description: "Admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-w-[425px]">
      <body
        style={{ height: "100vh" }}
        className={`${inter.className} overflow-hidden flex z-50`}
      >
        <ProviderContainer>
          {/* SideBar */}
          <Sidebar />
          <div className="bg-black2 overflow-y-auto relative flex-1">
            {/* header */}
            <Header />
            <div className="h-[calc(100%-80px)]">{children}</div>
          </div>
          <ToastContainer
            autoClose={5000}
            position="bottom-right"
            theme="dark"
            hideProgressBar
          />
        </ProviderContainer>
      </body>
    </html>
  );
}
