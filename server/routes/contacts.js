const express = require('express');
const app = express.Router();
const {
  createContact,
  updateContact,
  getContacts,
  deleteContact,
} = require('../controllers/contactController');
const { validateContact } = require('../middleware/checkContact');

// Routes
app.post('/', validateContact, createContact);
app.get('/', getContacts);
app.put('/:id', validateContact, updateContact);
app.delete('/:id', deleteContact);

module.exports = app;
