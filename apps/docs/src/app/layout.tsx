import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Provider } from "@/components/Provider";

import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={inter.className}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
