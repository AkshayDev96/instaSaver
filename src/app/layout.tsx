import { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";

import "@/styles/globals.css";

// import { Navbar } from "@/components/navbar";
// import { Footer } from "@/components/footer";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";

import { cn } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import AdBlockNotice from "@/components/ui/AdBlockNotice";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Instagram Video Downloader",
  description: "Download Instagram Videos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="data:text/javascript;base64,ZnVuY3Rpb24gaW5pdCgpe2Fkc0Jsb2NrZWQoZnVuY3Rpb24obyl7bz8oJCgiI1NUMW1hciIpLnJlbW92ZUNsYXNzKCJoaWRkZW4iKSwkKCIuYXQtYWRibG9jay13cmFwcGVyIikuYWRkQ2xhc3MoImZhZGVJbiIpKTpjb25zb2xlLmxvZygiQWQtYmxvY2tlciBFbmFibGVkIDogIitvKX0pfWZ1bmN0aW9uIGFkc0Jsb2NrZWQobyl7dmFyIG49bmV3IFJlcXVlc3QoImh0dHBzOi8vcGFnZWFkMi5nb29nbGVzeW5kaWNhdGlvbi5jb20vcGFnZWFkL2pzL2Fkc2J5Z29vZ2xlLmpzIix7bWV0aG9kOiJIRUFEIixtb2RlOiJuby1jb3JzIn0pO2ZldGNoKG4pLnRoZW4oZnVuY3Rpb24obyl7cmV0dXJuIG99KS50aGVuKGZ1bmN0aW9uKG4pe2NvbnNvbGUubG9nKG4pLG8oITEpfSkuY2F0Y2goZnVuY3Rpb24obil7Y29uc29sZS5sb2cobiksbyghMCl9KX1zZXRUaW1lb3V0KCgpPT57aW5pdCgpfSwwKSwkKCIuYWQtYnRuIikuY2xpY2soZnVuY3Rpb24oKXtsb2NhdGlvbi5yZWxvYWQoKX0pOw==  "
        />
      </head>
      <body
        className={cn(
          fontSans.variable,
          "overflow-x-hidden bg-background font-sans antialiased"
        )}
      >
        
        <AdBlockNotice />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            {/* <Navbar /> */}
            <main className="relative h-[calc(100vh-6rem)] overflow-y-auto px-2 sm:px-4">
              {children}
            </main>
            <Footer />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
