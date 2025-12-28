import { useState, ReactNode } from "react";
import { ProductName, ContentType } from "@/components/Modal/Modal";

export interface ModalData<T extends ContentType = ContentType> {
  productName: ProductName;
  epicTitle: string;
  title: string;
  contentType: T;
  contentData: ReactNode;
}

export function useModal<T extends ContentType = ContentType>() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData<T> | null>(null);

  const openModal = (data: ModalData<T>) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };

  return { isOpen, modalData, openModal, closeModal };
}
