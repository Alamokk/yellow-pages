export interface Contact {
    _id: string;
    name: string;
    phone: string;
    email: string;
}

export type ContactAction = "add" | "edit" | "delete";

export type ContactOrFormData = Contact | FormData;