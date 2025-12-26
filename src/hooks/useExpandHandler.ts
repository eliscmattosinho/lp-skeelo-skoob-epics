import { useCallback } from "react";
import { ReactNode } from "react";
import { ProductName, ContentType } from "@/components/Modal/Modal";

type OpenModalFn = (
  productName: ProductName,
  epicTitle: string,
  title: string,
  contentType: ContentType,
  contentNode: ReactNode
) => void;

const useExpandHandler = (openModal: OpenModalFn) => {
  return useCallback(
    (
      productName: ProductName,
      epicTitle: string,
      title: string,
      contentType: ContentType,
      contentNode: ReactNode
    ) => {
      openModal(productName, epicTitle, title, contentType, contentNode);
    },
    [openModal]
  );
};

export default useExpandHandler;
