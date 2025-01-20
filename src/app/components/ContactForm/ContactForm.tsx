"use client";

import styles from "./ContactForm.module.css";

import { Contact } from "@types/contact";
import ContactDialog from "@components/ContactDialog/ContactDialog";
import useContactDialog from "@components/ContactDialog/useContactDialog";

const defaultContact: Contact = { _id: "", name: "", email: "", phone: "" };

interface SearchFieldProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ContactForm({
  searchQuery,
  setSearchQuery,
}: SearchFieldProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const {
    isDialogOpen,
    action,
    selectedContact,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
  } = useContactDialog({ contact: defaultContact });

  return (
    <>
      <div className={styles.toolbar}>
        <input
          type="search"
          placeholder="Search contacts..."
          className={styles.searchBar}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          className={styles.addButton}
          onClick={() => handleOpenDialog("add", defaultContact)}
        >
          Add Contact
        </button>
      </div>
      <ContactDialog
        isOpen={isDialogOpen}
        action={action}
        contact={selectedContact}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />
    </>
  );
}
