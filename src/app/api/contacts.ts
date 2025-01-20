'use server'

import axios from "axios";

// Create
export async function createContact(formData: FormData) {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, formData);
}

// Read
export async function getContacts() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`, {
        headers: {
            'Cache-Control': 'no-store', // or 'no-cache' depending on your use case
        },
    });
    return response?.data?.contacts || [];
}

export async function getContactById(id: string) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
    return response?.data?.contact || {};
}

// Update
export async function updateContact(id: string, formData: FormData) {
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, formData);
}

// Delete
export async function deleteContact(id: string) {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
}
