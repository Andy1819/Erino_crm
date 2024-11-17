const Contact = require('../models/Contact'); 

// Create new contact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

    // Create the new contact in the database
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle,
    });

    await newContact.save();
    res.status(201).json({ message: 'Contact created successfully!', contact: newContact });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Error creating contact.' });
  }
};

// Update an existing contact
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact updated successfully!', contact });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact.', error: error.message });
  }
};

// Get all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts.' });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact deleted successfully!' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact.' });
  }
};

module.exports = { createContact, updateContact, getContacts, deleteContact };
