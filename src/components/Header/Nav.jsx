import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import "./Nav.css"

function Nav({
  items,
  isMobile,
  isSubmenuVisible,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <>
      {items.map((item) => {
        const hasChildren = Boolean(item.children);

        // SOBRE (com submenu)
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
              >
                {item.label}

                {!isMobile && (
                  <span className="icon-wrapper">
                    {isSubmenuVisible ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </span>
                )}
              </a>

              {(isMobile || isSubmenuVisible) && (
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
          >
            {item.label}
          </a>
        );
      })}
    </>
  );
}

export default Nav;
