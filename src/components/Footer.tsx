import React from "react";
import Link from "next/link";

interface FooterProps {
  isProjectPage?: boolean;
}

export default function Footer({ isProjectPage = false }: FooterProps) {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://github.com/kaixwu/" target="_blank" rel="noopener noreferrer">
          <i className="bx bxl-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/kyle-christian-casipit-55520b33a/" target="_blank" rel="noopener noreferrer">
          <i className="bx bxl-linkedin-square"></i>
        </a>
        <a href="https://www.instagram.com/kaixwu/" target="_blank" rel="noopener noreferrer">
          <i className="bx bxl-instagram-alt"></i>
        </a>
      </div>

      <ul className="list" style={{ listStyle: "none" }}>
        {isProjectPage ? (
          <>
            <li><Link href="/#faq">FAQ</Link></li>
            <li><Link href="/#services">Services</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#projects">Projects</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </>
        ) : (
          <>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </>
        )}
      </ul>

      <p className="copyright">
        Kc Casipit | All Rights Reserved
      </p>
    </footer>
  );
}
