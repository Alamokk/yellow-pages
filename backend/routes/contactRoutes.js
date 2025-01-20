import { Router } from "express";
import mongoose from "mongoose";
import Contact from "./../models/contact.js";

const router = Router();

// Create
router.post("/", async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const contact = new Contact({
      name,
      phone,
      email,
    });
    await contact.save();
    res.status(200).json({ message: "Contact created successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json({ contacts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID format" });
  }

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID format" });
  }

  try {
    const { name, phone, email } = req.body;
    const contact = await Contact.findByIdAndUpdate(id, { name, phone, email });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID format" });
  }

  try {
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
