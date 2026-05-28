"use client";

import React, { useState } from "react";
import Link from "next/link";

interface HeaderProps {
  isProjectPage?: boolean;
}

export default function Header({ isProjectPage = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      {isProjectPage ? (
        <Link href="/#home" className="logo">
          Kc <span>Casipit</span>
        </Link>
      ) : (
        <a href="#home" className="logo">
          Kc <span>Casipit</span>
        </a>
      )}

      <i
        className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"}`}
        id="menu-icon"
        onClick={toggleMenu}
        style={{ display: "block", cursor: "pointer" }}
      ></i>

      <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
        {isProjectPage ? (
          <>
            <Link href="/#home" onClick={closeMenu}>Home</Link>
            <Link href="/#services" onClick={closeMenu}>Services</Link>
            <Link href="/#projects" onClick={closeMenu}>Projects</Link>
            <Link href="/#about" onClick={closeMenu}>About</Link>
            <Link href="/#contact" onClick={closeMenu}>Contact</Link>
          </>
        ) : (
          <>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </>
        )}
      </nav>
    </header>
  );
}
