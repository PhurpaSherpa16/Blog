import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BlogNavbar from "./components/blogNavbar";
import ThemeProvider from "./components/theme/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <BlogNavbar />
          <div className="container mx-auto py-16">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
