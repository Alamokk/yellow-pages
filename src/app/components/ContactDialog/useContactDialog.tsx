"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Contact, ContactAction } from "@types/contact";
import { createContact, deleteContact, updateContact } from "api/contacts";

interface useContactDialogProps {
  contact: Contact;
}

export default function useContactDialog({ contact }: useContactDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [action, setAction] = useState<ContactAction>("add");
  const [selectedContact, setSelectedContact] = useState<Contact>(contact);
  const pathname = usePathname();
  const router = useRouter();

  const handleOpenDialog = (action: ContactAction, contact: Contact) => {
    setAction(action);
    setSelectedContact(contact);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      switch (action) {
        case "add":
          await createContact(formData);
          break;

        case "edit":
          await updateContact(selectedContact._id, formData);
          break;

        case "delete":
          await deleteContact(selectedContact._id);
          break;

        default:
          console.error("Unknown action:", action);
      }

      setIsDialogOpen(false);
      if (pathname === "/") {
        window.location.reload();
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  return {
    isDialogOpen,
    action,
    selectedContact,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
  };
}
