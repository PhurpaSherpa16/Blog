import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/theme/theme-provider";
import { AuthProvider } from "./components/auth/AuthContext";
import Navbarwrapper from "./components/navbar-wrapper";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blog || Phurpa Sherpa",
  description: "Blog created by Phurpa Sherpa",
  icons: {
    icon: '/icon.svg',
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-p-10 scroll-smooth">
      <body>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
            <div className="flex flex-col">
              <div className="pb-16">
                  <Navbarwrapper/>
                  <div className="relative">
                    {children}
                  </div>
              </div>
              <Footer/>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
