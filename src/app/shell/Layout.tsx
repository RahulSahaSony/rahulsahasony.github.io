import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StickyBadgeSlot from "./StickyBadgeSlot";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-bg min-h-screen">
      <Navbar />
      <main className="pt-10 pb-20">{children}</main>
      <Footer />
      <StickyBadgeSlot />
    </div>
  );
}
