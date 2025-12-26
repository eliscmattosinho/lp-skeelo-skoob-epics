import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import "./NavItems.css";

function NavItems({
  items,
  isMobile,
  isSubmenuVisible,
  onMouseEnter,
  onMouseLeave,
  onItemClick,
}) {
  // controla qual submenu mobile está aberto
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);

  const handleMobileToggle = (label, hasChildren, event) => {
    if (!isMobile || !hasChildren) return;

    // impede navegação no item pai
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
        if (hasChildren) {
          return (
            <div
              key={item.label}
              id="submenu"
              onMouseEnter={!isMobile ? onMouseEnter : undefined}
              onMouseLeave={!isMobile ? onMouseLeave : undefined}
            >
              <a
                href={item.href}
                className={isMobile ? "mobile-item" : "web-item"}
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
                <ul className={isMobile ? "mobile-submenu" : "submenu"}>
                  {item.children.map((child) => (
                    <li
                      key={child.label}
                      className={isMobile ? "mobile-subitem" : undefined}
                    >
                      <a
                        href={child.href}
                        className={
                          isMobile ? "mobile-subitem" : "web-subitem"
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
            className={isMobile ? "mobile-item" : "web-item"}
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
