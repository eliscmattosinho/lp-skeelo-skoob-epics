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
  const [openMobileSubmenu, setOpenMobileSubmenu] =
    useState<string | null>(null);

  const handleMobileToggle = (
    label: string,
    hasChildren: boolean,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (!isMobile || !hasChildren) return;

    event.preventDefault();

    setOpenMobileSubmenu(prev => {
      const next = prev === label ? null : label;
      onSubmenuToggle?.(Boolean(next));
      return next;
    });
  };

  return (
    <>
      {items.map(item => {
        const hasChildren = Boolean(item.children);
        const isMobileSubmenuOpen = openMobileSubmenu === item.label;

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
                    isMobileSubmenuOpen ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )
                  ) : isSubmenuVisible ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              </a>

              {/* MOBILE */}
              {isMobile && (
                <ul
                  className={`mobile-submenu ${
                    isMobileSubmenuOpen ? 'open' : ''
                  }`}
                >
                  {item.children.map(child => (
                    <li key={child.label} className="mobile-subitem">
                      <a
                        href={child.href}
                        className="mobile-subitem"
                        onClick={() => {
                          if (onItemClick) {
                            onItemClick();
                            setOpenMobileSubmenu(null);
                            onSubmenuToggle?.(false);
                          }
                        }}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* DESKTOP */}
              {!isMobile && isSubmenuVisible && (
                <ul className="submenu">
                  {item.children.map(child => (
                    <li key={child.label}>
                      <a href={child.href} className="web-subitem">
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
