"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TableOfContents } from "./TableOfContents";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={`bg-white shadow-sm ${isSticky ? "sticky top-0 z-50" : ""}`}>
      <div
        className="
          max-w-screen-xl mx-auto
          px-2 py-3
          sm:px-4 sm:py-4
          flex justify-between items-center
        "
      >
        <div className="flex items-center">
          <button onClick={toggleMenu} className="lg:hidden mr-3 sm:mr-4">
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <Link
            href="/"
            className="
              font-bold
              text-xl sm:text-2xl
              leading-tight
              tracking-tight
            "
          >
            KnowldB
          </Link>
        </div>
        {/* <div className="flex-1 mx-4">
          <input type="text" placeholder="検索" className="w-1/2 px-2 py-1 border rounded-md" />
        </div> */}
        <nav className="lg:flex items-center">
          <ul className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            {/* "/"（メインページ）以外でのみ目次を表示 */}
            {pathname !== "/" && (
              <li className="lg:hidden">
                <TableOfContents />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
