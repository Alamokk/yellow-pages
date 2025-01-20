"use client";

import styles from "./ContactDetail.module.css";
import ContactDialog from "@components/ContactDialog/ContactDialog";
import useContactDialog from "@components/ContactDialog/useContactDialog";
import ErrorDialog from "@components/ErrorDialog/ErrorDialog";
import Loader from "@components/Loader/Loader";
import { Contact } from "@types/contact";
import { getContactById } from "api/contacts";
import { useEffect, useState } from "react";

const defaultContact: Contact = { _id: "", name: "", email: "", phone: "" };

interface ContactDetailProps {
  _id: string;
}

export default function ContactDetail({ _id }: ContactDetailProps) {
  const {
    isDialogOpen,
    action,
    selectedContact,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
  } = useContactDialog({ contact: defaultContact });

  const [contact, setContact] = useState<Contact>(defaultContact);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchContactById();
  }, []);

  async function fetchContactById() {
    try {
      const response = await getContactById(_id);
      setContact(response);
    } catch (error: any) {
      setError(error.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Loader />;
  if (error) return <ErrorDialog error={error} />;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{contact.name}</h1>
      <div className={styles.detailsCard}>
        <div className={styles.infoContainer}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{contact.email}</span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.label}>Phone:</span>
            <span className={styles.value}>{contact.phone}</span>
          </div>

          <div className={styles.buttonContainer}>
            <button
              className={styles.primaryButton}
              onClick={() => handleOpenDialog("edit", contact)}
            >
              Edit Contact
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => handleOpenDialog("delete", contact)}
            >
              Delete Contact
            </button>
          </div>
        </div>
      </div>

      <ContactDialog
        isOpen={isDialogOpen}
        action={action}
        contact={selectedContact}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
