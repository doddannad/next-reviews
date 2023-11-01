import Link from "next/link";
import { ReactNode } from "react";

import "./global.css";
import Nav from "../components/Nav";
import { orbitron } from "./font";

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: {
    default: "Home - Indie Gamer",
    template: "%s - Indie Gamer"
  }
  
}

export default ({ children }: LayoutProps) => {
  return (
    <html lang="en" className={`${orbitron.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex px-5 py-5 flex-col min-h-screen bg-orange-100">
        <header>
          <Nav />
        </header>
        <main className="grow">{children}</main>
        <footer className="text-center text-xs">
          <p>Deployed on Vercel</p>
        </footer>
      </body>
    </html>
  );
};
