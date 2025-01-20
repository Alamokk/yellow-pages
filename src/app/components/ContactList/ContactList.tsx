"use client";

import Link from "next/link";
import styles from "./ContactList.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Contact } from "@types/contact";
import ContactDialog from "@components/ContactDialog/ContactDialog";
import useContactDialog from "@components/ContactDialog/useContactDialog";

const defaultContact: Contact = { _id: "", name: "", email: "", phone: "" };

interface ContactListProps {
  searchQuery: string;
  contacts: Contact[];
}

export default function ContactList({
  searchQuery,
  contacts,
}: ContactListProps) {
  const {
    isDialogOpen,
    action,
    selectedContact,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
  } = useContactDialog({ contact: defaultContact });

  const handleEditClick = (contact: Contact) => {
    handleOpenDialog("edit", contact);
  };

  const handleDeleteClick = (contact: Contact) => {
    handleOpenDialog("delete", contact);
  };

  const filteredContacts = contacts?.length
    ? contacts.filter((contact: Contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts?.map((contact: Contact) => (
            <tr key={contact?._id}>
              <td>
                <Link
                  href={`/contacts/${contact._id}`}
                  key={contact._id}
                  className={styles.contactLink}
                >
                  {contact?.name}
                </Link>
              </td>

              <td>{contact?.phone}</td>
              <td>{contact?.email}</td>
              <td>
                <FaEdit
                  className={styles.editIcon}
                  onClick={() => handleEditClick(contact)}
                />
                <FaTrash
                  className={styles.deleteIcon}
                  onClick={() => handleDeleteClick(contact)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
