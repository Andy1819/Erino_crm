import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contacts';

export const getContacts = async (sortBy, order) => {
  const response = await axios.get(`${API_URL}?sortBy=${sortBy}&order=${order}`);
  return response.data;
};

export const createContact = async (data) => {
    if (data.id) {
      // If there's an ID, update the contact
      await axios.put(`${API_URL}/${data.id}`, data);
    } else {
      // Otherwise, create a new contact
      await axios.post(API_URL, data);
    }
  };
  
export const deleteContact = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
