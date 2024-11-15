// routes/contactRoutes.js

const express = require('express');
const app = express.Router();
const Contact = require('../models/Contact');
const { validateContact } = require('../middleware/checkContact');  // Import validation middleware

// Create a new contact
app.post('/', validateContact, async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    // Check if the phone number already exists
    const existingContact = await Contact.findOne({ phoneNumber });
    if (existingContact) {
      return res.status(400).json({ message: 'Phone number already exists' });
    }
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all contacts with sorting
app.get('/', async (req, res) => {
  const { sortBy = 'firstName', order = 'asc' } = req.query; // Default sorting
  const validSortFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'company', 'jobTitle'];

  // Validate sortBy field
  if (!validSortFields.includes(sortBy)) {
    return res.status(400).json({ message: 'Invalid sortBy field.' });
  }

  // Validate order (should be 'asc' or 'desc')
  const validOrders = ['asc', 'desc'];
  if (!validOrders.includes(order)) {
    return res.status(400).json({ message: 'Invalid order. Use "asc" or "desc".' });
  }

  try {
    const contacts = await Contact.find().sort({ [sortBy]: order === 'asc' ? 1 : -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Update a contact
// Update a contact
app.put('/:id', async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    // Check if the phone number exists for another contact (excluding the current contact)
    const existingContact = await Contact.findOne({ phoneNumber, _id: { $ne: req.params.id } });
    if (existingContact) {
      return res.status(400).json({ message: 'Phone number already exists' });
    }

    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Delete a contact
app.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;
