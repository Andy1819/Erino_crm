// import React, { useState } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
// import axios from "axios";

// const EditContactForm = ({ contact, open, onClose, onUpdate }) => {
//   const [formData, setFormData] = useState(contact);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/contacts/${formData._id}`, formData);
//       onUpdate();
//       onClose();
//     } catch (error) {
//       console.error("Error updating contact:", error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Edit Contact</DialogTitle>
//       <DialogContent>
//         <TextField
//           margin="dense"
//           label="First Name"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           margin="dense"
//           label="Last Name"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           margin="dense"
//           label="Email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           margin="dense"
//           label="Phone Number"
//           name="phone"
//           value={formData.phoneNumber}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           margin="dense"
//           label="Company"
//           name="company"
//           value={formData.company}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           margin="dense"
//           label="Job Title"
//           name="jobTitle"
//           value={formData.jobTitle}
//           onChange={handleChange}
//           fullWidth
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit} color="primary">
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditContactForm;


import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import axios from "axios";
import { toast } from 'react-toastify'; // Import toast

const EditContactForm = ({ contact, open, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(contact);
  const [changed, setChanged] = useState(false);
  const [initial, setInitial] = useState(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitial(formData);
    setFormData({ ...formData, [name]: value });
  };

  useEffect (() => {
    const formChange = JSON.stringify(formData) !== JSON.stringify(initial);
    setChanged(formChange);
  },[[formData, initial]]);

  const handleSubmit = async () => {
    try {
      // Update the contact in the database
      await axios.put(`http://localhost:5000/api/contacts/${formData._id}`, formData);
      
      // Toast success message
      toast.success("Contact updated successfully!");

      // Call the onUpdate function to refresh the contact list
      onUpdate();
      onClose(); // Close the dialog
    } catch (error) {
      console.error("Error updating contact:", error);
      // Toast error message
      toast.error("Error updating contact!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Phone Number"
          name="phoneNumber"  // Ensure the name matches formData field
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!changed} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditContactForm;
