// middleware/validationMiddleware.js

const validateContact = (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  
    // Check if first name and last name exist
    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'First name and last name are required.' });
    }
  
    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }
  
    // Validate phone number length (should be exactly 10 digits)
    if (phoneNumber && phoneNumber.length !== 10) {
      return res.status(400).json({ message: 'Phone number must be 10 digits long.' });
    }
  
    // Check if company and job title exist
    if (!company || !jobTitle) {
      return res.status(400).json({ message: 'Company and job title are required.' });
    }
  
    next();  // Proceed to the next middleware (route handler)
  };
  
  module.exports = { validateContact };
  