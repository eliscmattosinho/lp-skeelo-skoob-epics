import { IoCloseOutline } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { useNav } from "./hooks/useNav";
import { contextNav } from "@/constants/navigation";
import NavItems from "./components/NavItems";
import "./Nav.css";

function Nav() {
  const {
    isMobile,
    isMenuOpen,
    isSubmenuVisible,
    isMobileSubmenuOpen,
    menuRef,
    handleMouseEnter,
    handleMouseLeave,
    toggleMenu,
    closeMenu,
    setIsMobileSubmenuOpen,
  } = useNav();

  return (
    <header className="nav-bar">
      <nav id="nav" aria-label="Navegação principal">
        <h2 className="w-600">
          <a href="/">Proposta</a>
        </h2>

        {isMobile ? (
          <button
            className="btn-menu"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
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
          <div
            id="mobile-menu"
            ref={menuRef}
            className={isMobileSubmenuOpen ? "expanded" : ""}
          >
            <NavItems
              items={contextNav}
              isMobile
              onItemClick={closeMenu}
              onSubmenuToggle={setIsMobileSubmenuOpen}
            />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Nav;
