import { useState, useEffect } from "react";
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

  const handleMouseEnter = () => {
    setSubmenuVisible(true);
    if (timeoutId) clearTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setSubmenuVisible(false), 300);
    setTimeoutId(id);
  };

  useEffect(() => {
    if (!isMobile) setIsMenuOpen(false);
  }, [isMobile]);

  return (
    <header className="nav-bar">
      <nav id="nav" aria-label="Navegação principal">
        <h2 className="w-600">
          <a href="/">Proposta</a>
        </h2>

        {isMobile ? (
          <button
            className="btn-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          <div id="mobile-menu">
            <NavItems items={contextNav} isMobile />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Nav;
