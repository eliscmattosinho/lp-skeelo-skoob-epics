import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import './NavItems.css';

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
}

function NavItems({
  items,
  isMobile,
  isSubmenuVisible = false,
  onMouseEnter,
  onMouseLeave,
  onItemClick,
}: NavItemsProps) {
  // controla qual submenu mobile está aberto
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

  const handleMobileToggle = (
    label: string,
    hasChildren: boolean,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (!isMobile || !hasChildren) return;

    event.preventDefault();

    setOpenMobileSubmenu((prev) =>
      prev === label ? null : label
    );
  };

  return (
    <>
      {items.map((item) => {
        const hasChildren = Boolean(item.children);
        const isMobileSubmenuOpen = openMobileSubmenu === item.label;

        // Item com submenu
        if (hasChildren && item.children) {
          return (
            <div
              key={item.label}
              id="submenu"
              onMouseEnter={!isMobile ? onMouseEnter : undefined}
              onMouseLeave={!isMobile ? onMouseLeave : undefined}
            >
              <a
                href={item.href}
                className={isMobile ? 'mobile-item' : 'web-item'}
                onClick={(e) =>
                  handleMobileToggle(item.label, hasChildren, e)
                }
              >
                {item.label}

                <span className="icon-wrapper">
                  {isMobile ? (
                    isMobileSubmenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />
                  ) : isSubmenuVisible ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              </a>

              {/* Submenu */}
              {(!isMobile && isSubmenuVisible) ||
                (isMobile && isMobileSubmenuOpen) ? (
                <ul className={isMobile ? 'mobile-submenu' : 'submenu'}>
                  {item.children.map((child) => (
                    <li
                      key={child.label}
                      className={isMobile ? 'mobile-subitem' : undefined}
                    >
                      <a
                        href={child.href}
                        className={
                          isMobile ? 'mobile-subitem' : 'web-subitem'
                        }
                        onClick={() => {
                          if (isMobile && onItemClick) {
                            onItemClick();
                            setOpenMobileSubmenu(null);
                          }
                        }}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        }

        // Item simples
        return (
          <a
            key={item.label}
            href={item.href}
            className={isMobile ? 'mobile-item' : 'web-item'}
            onClick={() => {
              if (isMobile && onItemClick) {
                onItemClick();
              }
            }}
          >
            {item.label}
          </a>
        );
      })}
    </>
  );
}

export default NavItems;
