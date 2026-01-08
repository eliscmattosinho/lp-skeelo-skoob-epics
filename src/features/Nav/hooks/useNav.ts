import { useState, useEffect, useRef } from "react";
import { useScreen } from "@/contexts/ScreenContext";

export const useNav = () => {
  const { isMobile } = useScreen();
  const [isSubmenuVisible, setSubmenuVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileSubmenuOpen(false);
  };

  useEffect(() => {
    if (!isMobile) closeMenu();
  }, [isMobile]);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (event.button !== 0) return;
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return {
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
  };
};
