"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { Contact } from "@types/contact";
import { useEffect, useState } from "react";
import { getContacts } from "api/contacts";
import Loader from "@components/Loader/Loader";
import ErrorDialog from "@components/ErrorDialog/ErrorDialog";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const response = await getContacts();
      setContacts(response);
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
      <h1 className={styles.heading}>Contacts</h1>
      <div>
        {contacts?.map((contact) => (
          <Link
            href={`/contacts/${contact._id}`}
            key={contact._id}
            className={styles.contactLink}
          >
            <div className={styles.contactItem}>
              <span>{contact.name}</span>
              <span>{contact.email}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
