import React, { useEffect } from "react";
import styles from "./Modal.module.scss";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer = null, 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {(title || onClose) && (
          <div className={styles.header}>
            {title && <h5 className={styles.title}>{title}</h5>}
            <button className={styles.closeBtn} onClick={onClose}>
              &times;
            </button>
          </div>
        )}

        <div className={styles.body}>{children}</div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
