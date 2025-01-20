"use client";

import React, { useState, useEffect } from "react";
import styles from "./ContactDialog.module.css";
import { Contact, ContactAction } from "@types/contact";

interface ContactDialogProps {
  isOpen: boolean;
  action: ContactAction;
  contact: Contact;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const defaultContact: Contact = { _id: "", name: "", email: "", phone: "" };

export default function ContactDialog({
  isOpen,
  action,
  contact = defaultContact,
  onClose,
  onSubmit,
}: ContactDialogProps) {
  const [formData, setFormData] = useState<Contact>(contact);

  useEffect(() => {
    setFormData(contact);
  }, [contact]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <div className={styles.dialog}>
      <h2 className={styles.dialogTitle}>
        {action === "add"
          ? "Add Contact"
          : action === "edit"
          ? "Edit Contact"
          : `Are you sure you want to delete ${formData.name}?`}
      </h2>

      {action !== "delete" && (
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      )}

      {action === "delete" && (
        <div className={styles.contactData}>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button onClick={handleSubmit} className={styles.primaryButton}>
          {action === "add" ? "Add" : action === "edit" ? "Update" : "Delete"}
        </button>
        <button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}
