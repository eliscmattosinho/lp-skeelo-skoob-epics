import { useState, useEffect } from "react";
import { MdOutlineMenu, MdClose } from "react-icons/md";

import Nav from "./Nav";
import { navItems } from "./navItems";
import "./Header.css";

function Header() {
  const [isSubmenuVisible, setSubmenuVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
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
    const handleResize = () => {
      const mobile = window.innerWidth <= 480;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="header-bar">
      <header id="header" className="content">
        <div className="logo-container">
          <h3 className="logo-icon">
            <a href="./">Proposta</a>
          </h3>
        </div>

        {isMobile ? (
          <button
            className="menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <MdClose size={32} /> : <MdOutlineMenu size={32} />}
          </button>
        ) : (
          <nav className="nav-items">
            <Nav
              items={navItems}
              isMobile={false}
              isSubmenuVisible={isSubmenuVisible}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </nav>
        )}

        {isMobile && isMenuOpen && (
          <header id="mobile-menu">
            <Nav items={navItems} isMobile />
          </header>
        )}
      </header>
    </div>
  );
}

export default Header;
