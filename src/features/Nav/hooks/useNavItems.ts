import { useState, useEffect } from "react";

interface UseNavItemsProps {
  isMobile: boolean;
  onSubmenuToggle?: (open: boolean) => void;
  onItemClick?: () => void;
}

export const useNavItems = ({
  isMobile,
  onSubmenuToggle,
  onItemClick,
}: UseNavItemsProps) => {
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null
  );

  useEffect(() => {
    onSubmenuToggle?.(Boolean(openMobileSubmenu));
  }, [openMobileSubmenu, onSubmenuToggle]);

  const handleMobileToggle = (
    label: string,
    hasChildren: boolean,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (!isMobile || !hasChildren) return;
    event.preventDefault();
    setOpenMobileSubmenu((prev) => (prev === label ? null : label));
  };

  const handleChildClick = () => {
    if (onItemClick) {
      onItemClick();
      setOpenMobileSubmenu(null);
    }
  };

  return {
    openMobileSubmenu,
    handleMobileToggle,
    handleChildClick,
  };
};
