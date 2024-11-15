import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';  // Add these
import 'react-toastify/dist/ReactToastify.css';  // Import toast CSS
import EditContactForm from './EditContactForm';
import ContactForm from './ContactForm';
import { getContacts, deleteContact } from '../api/contactAPI';


const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [sortBy, setSortBy] = useState('firstName');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchContacts();
  }, [sortBy, order]);

  const fetchContacts = async () => {
    try {
      const sortedContacts = await getContacts(sortBy, order);
      setContacts(sortedContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      fetchContacts();  // Reload contacts after deletion
      toast.success('Contact deleted successfully!!');  // Show success toast
    } catch (error) {
      console.error("Error in deleting contact:", error);
      toast.error('Error in deleting contact');  // Show error toast on failure
    }
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setOpenEditModal(true);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setOrder(order === 'asc' ? 'desc' : 'asc');  // Toggle sort direction
    } else {
      setSortBy(column);
      setOrder('asc');  // Default to ascending for a new column
    }
    fetchContacts();  // Refetch contacts with new sorting
  };

  // Table pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentContacts = contacts.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div>
      <ContactForm onSuccess={fetchContacts} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('firstName')}>
                First Name {sortBy === 'firstName' ? (order === 'asc' ? '↑' : '↓') : ''}
              </TableCell>
              <TableCell onClick={() => handleSort('lastName')}>
                Last Name {sortBy === 'lastName' ? (order === 'asc' ? '↑' : '↓') : ''}
              </TableCell>
              <TableCell onClick={() => handleSort('email')}>
                Email {sortBy === 'email' ? (order === 'asc' ? '↑' : '↓') : ''}
              </TableCell>
              <TableCell onClick={() => handleSort('phoneNumber')}>
                Phone {sortBy === 'phoneNumber' ? (order === 'asc' ? '↑' : '↓') : ''}
              </TableCell>
              <TableCell onClick={() => handleSort('company')}>
                Company {sortBy === 'company' ? (order === 'asc' ? '↑' : '↓') : ''}
              </TableCell>
              <TableCell onClick={() => handleSort('jobTitle')}>
                Job Title {sortBy === 'jobTitle' ? (order === 'asc' ? '↑' : '↓') : ''}
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentContacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(contact)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(contact._id)}
                    style={{ marginLeft: '8px' }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={Math.ceil(contacts.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          style={{ margin: "16px" }}
        />
        {openEditModal && (
          <EditContactForm
            contact={selectedContact}
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            onUpdate={fetchContacts}
          />
        )}
      </TableContainer>

      {/* Toast container to show notifications */}
      <ToastContainer />
    </div>
  );
};

export default ContactsTable;
