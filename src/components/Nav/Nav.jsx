import { useState, useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";

import { useScreen } from "@/context/ScreenContext";
import NavItems from "./NavItems";
import { contextNav } from "@/config/contextNav";

import "./Nav.css";

function Nav() {
  const { isMobile } = useScreen();

  const [isSubmenuVisible, setSubmenuVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const handleMouseEnter = () => {
    setSubmenuVisible(true);
    if (timeoutId) clearTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setSubmenuVisible(false), 300);
    setTimeoutId(id);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fecha o menu ao sair do modo mobile
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="nav-bar">
      <nav id="nav" aria-label="Navegação principal">
        <h2 className="w-600">
          <a href="/">Proposta</a>
        </h2>

        {isMobile ? (
          <button
            className="btn-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <IoCloseOutline className="menu-icon" size={25} />
            ) : (
              <CiMenuBurger className="menu-icon" size={25} />
            )}
          </button>
        ) : (
          <div className="web-items">
            <NavItems
              items={contextNav}
              isMobile={false}
              isSubmenuVisible={isSubmenuVisible}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        )}

        {isMobile && isMenuOpen && (
          <div id="mobile-menu" ref={menuRef}>
            <NavItems
              items={contextNav}
              isMobile
              onItemClick={closeMenu}
            />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Nav;
