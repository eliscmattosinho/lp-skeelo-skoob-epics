import { useState, useEffect, useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { CiMenuBurger } from 'react-icons/ci';

import { useScreen } from '@/contexts/ScreenContext';
import NavItems from './NavItems';
import { contextNav } from '@/constants/navigation';

import './Nav.css';

function Nav() {
  const { isMobile } = useScreen();

  const [isSubmenuVisible, setSubmenuVisible] = useState(false);
  const [timeoutId, setTimeoutId] =
    useState<ReturnType<typeof setTimeout> | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

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
    setIsMobileSubmenuOpen(false);
  };

  // Saiu do mobile
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
      setIsMobileSubmenuOpen(false);
    }
  }, [isMobile]);

  // Click fora
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (event.button !== 0) return;

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
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
            onClick={() => setIsMenuOpen(prev => !prev)}
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
          <div
            id="mobile-menu"
            ref={menuRef}
            className={isMobileSubmenuOpen ? 'expanded' : ''}
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
