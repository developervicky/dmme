import Modal from "@/app/components/Modal";
import Image from "next/image";
import React, { FC } from "react";

interface ImageModalProps {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
}

const ImageModal: FC<ImageModalProps> = ({ src, isOpen, onClose }) => {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-96 w-96 ">
        <Image alt="image" src={src} className="object-contain p-6" fill />
      </div>
    </Modal>
  );
};

export default ImageModal;
