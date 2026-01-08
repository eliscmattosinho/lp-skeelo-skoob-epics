import { IoIosArrowDown } from "react-icons/io";
import { useNavItems } from "../hooks/useNavItems";
import "./NavItems.css";

interface NavItemChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: readonly NavItemChild[];
}

interface NavItemsProps {
  items: readonly NavItem[];
  isMobile: boolean;
  isSubmenuVisible?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onItemClick?: () => void;
  onSubmenuToggle?: (open: boolean) => void;
}

function NavItems({
  items,
  isMobile,
  isSubmenuVisible = false,
  onMouseEnter,
  onMouseLeave,
  onItemClick,
  onSubmenuToggle,
}: NavItemsProps) {
  const { openMobileSubmenu, handleMobileToggle, handleChildClick } =
    useNavItems({ isMobile, onSubmenuToggle, onItemClick });

  return (
    <>
      {items.map((item) => {
        const hasChildren = Boolean(item.children);
        const isMobileSubmenuOpen = openMobileSubmenu === item.label;
        const isOpen = isMobile ? isMobileSubmenuOpen : isSubmenuVisible;

        if (hasChildren && item.children) {
          return (
            <div
              key={item.label}
              className="submenu-container"
              onMouseEnter={!isMobile ? onMouseEnter : undefined}
              onMouseLeave={!isMobile ? onMouseLeave : undefined}
            >
              <a
                href={item.href}
                className={isMobile ? "mobile-item" : "web-item"}
                onClick={(e) => handleMobileToggle(item.label, hasChildren, e)}
              >
                {item.label}
                <span className="icon-wrapper">
                  <IoIosArrowDown
                    className={`arrow-toggle ${isOpen ? "is-open" : ""}`}
                  />
                </span>
              </a>

              {/* DESKTOP */}
              {!isMobile && isSubmenuVisible && (
                <ul className="submenu open">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <a href={child.href} className="web-subitem">
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* MOBILE */}
              {isMobile && (
                <ul
                  className={`mobile-submenu ${isMobileSubmenuOpen ? "open" : ""
                    }`}
                >
                  {item.children.map((child) => (
                    <li key={child.label} className="mobile-subitem">
                      <a
                        href={child.href}
                        className="mobile-subitem"
                        onClick={handleChildClick}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }

        return (
          <a
            key={item.label}
            href={item.href}
            className={isMobile ? "mobile-item" : "web-item"}
            onClick={() => isMobile && onItemClick?.()}
          >
            {item.label}
          </a>
        );
      })}
    </>
  );
}

export default NavItems;
