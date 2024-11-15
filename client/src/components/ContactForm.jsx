import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { toast } from 'react-toastify';
import { createContact } from '../api/contactAPI';

const ContactForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.firstName || !formData.lastName) {
      toast.error("First name and last name are required!");
      return false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email address!");
      return false;
    }

    if (formData.phoneNumber.length !== 10) {
      toast.error("Phone number must be 10 digits long!");
      return false;
    }

    if (!formData.company || !formData.jobTitle) {
      toast.error("Company and job title are required!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createContact(formData);
      toast.success('Contact created successfully!');
      onSuccess();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message); // Show error message from the backend
      } else {
        toast.error('Error creating contact');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
        fullWidth
        margin="dense"
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        fullWidth
        margin="dense"
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
        margin="dense"
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        fullWidth
        margin="dense"
        inputProps={{ maxLength: 10 }}
      />
      <TextField
        label="Company"
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
        fullWidth
        margin="dense"
      />
      <TextField
        label="Job Title"
        name="jobTitle"
        value={formData.jobTitle}
        onChange={handleChange}
        required
        fullWidth
        margin="dense"
      />
      <Button type="submit" color="primary" variant="contained">
        Add
      </Button>
    </form>
  );
};

export default ContactForm;
