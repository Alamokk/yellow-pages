"use client";

import React from "react";
import styles from "./ErrorDialog.module.css";
import { IoClose } from "react-icons/io5";

interface ErrorDialogProps {
  error: string | null;
}

export default function ErrorDialog({ error }: ErrorDialogProps) {
  if (!error) return null;

  return (
    <div className={styles.errorDialog}>
      <button
        onClick={() => window.location.reload()}
        className={styles.closeButton}
      >
        <IoClose size={24} />
      </button>
      <h2 className={styles.heading}>Something went wrong!</h2>
      <p className={styles.errorMessage}>{error}</p>
    </div>
  );
}
