import React, { useState, useEffect } from "react";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineMenu, MdClose } from "react-icons/md";

import "./Header.css";

function Header() {
  const [isSubmenuVisible, setSubmenuVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setSubmenuVisible(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  // Preferência pessoal
  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setSubmenuVisible(false);
    }, 300);
    setTimeoutId(id);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
      if (window.innerWidth > 480) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="header-bar">
      <div id="header" className="content">

        {/* "Logo" */}
        <div id="logo">
          <h3 id="logo-icon proposta">
            <a href="#proposta">Proposta</a>
          </h3>
        </div>

        {/* Ícone de menu para mobile */}
        {isMobile ? (
          <button id="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <MdClose size={32} /> : <MdOutlineMenu size={32} />}
          </button>
        ) : (
          <div id="header-items">
            <div
              id="sub-items"
              onMouseEnter={() => handleMouseEnter(true)}
              onMouseLeave={() => handleMouseLeave(false)}
            >
              <a href="#sobre" id="case-about" className="header-item">
                Sobre
                <span className="icon-wrapper">
                  {isSubmenuVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </a>
              {isSubmenuVisible && (
                <ul className="sub-items">
                  <li>
                    <a href="#contexto" className="header-sub-item">
                      Contexto
                    </a>
                  </li>
                  <li>
                    <a href="#elementos" className="header-sub-item">
                      Elementos
                    </a>
                  </li>
                </ul>
              )}
            </div>
            <a href="#skeelo" className="header-item">Skeelo</a>
            <a href="#skoob" className="header-item">Skoob</a>
            <a href="#contato" className="header-item">Contato</a>
          </div>
        )}

        {/* Dropdown para Mobile */}
        {isMobile && isMenuOpen && (
          <div id="mobile-menu">
            <a href="#sobre" className="mobile-item">Sobre</a>
            <ul className="mobile-sub-menu">
              <li className="mobile-sub-menu-item">
                <a href="#contexto" className="mobile-sub-item">Contexto</a>
              </li>
              <li className="mobile-sub-menu-item">
                <a href="#elementos" className="mobile-sub-item">Elementos</a>
              </li>
            </ul>
            <a href="#skeelo" className="mobile-item">Skeelo</a>
            <a href="#skoob" className="mobile-item">Skoob</a>
            <a href="#contato" className="mobile-item">Contato</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
