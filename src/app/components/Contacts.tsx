"use client";

import { useEffect, useState } from "react";

import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import { Contact } from "@types/contact";
import { getContacts } from "api/contacts";
import ErrorDialog from "./ErrorDialog/ErrorDialog";
import Loader from "./Loader/Loader";

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");

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
    <>
      <ContactForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ContactList searchQuery={searchQuery} contacts={contacts} />
    </>
  );
}
