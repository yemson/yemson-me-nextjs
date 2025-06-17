"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 py-4 mb-4 backdrop-blur-xl bg-white/30 dark:bg-neutral-900/30 border-b border-neutral-200 dark:border-neutral-800 z-10 w-full">
      <div className="max-w-3xl mx-auto flex justify-between items-center px-4">
        <Link href={"/"} className="text-lg font-mono">
          yemson
        </Link>
        <nav className="flex gap-4">
          <Link
            href="/"
            className={`no-underline transition-opacity duration-200 ${
              pathname === "/" ||
              pathname.startsWith("/project") ||
              pathname === ""
                ? "opacity-100"
                : "opacity-50 hover:opacity-100"
            }`}
          >
            소개
          </Link>

          <Link
            href="/blog"
            className={`no-underline transition-opacity duration-200 ${
              pathname.startsWith("/blog")
                ? "opacity-100"
                : "opacity-50 hover:opacity-100"
            }`}
          >
            글
          </Link>

          <Link
            href="/playground"
            className={`no-underline transition-opacity duration-200 ${
              pathname.startsWith("/playground")
                ? "opacity-100"
                : "opacity-50 hover:opacity-100"
            }`}
          >
            놀이터
          </Link>
        </nav>
      </div>
    </header>
  );
}
