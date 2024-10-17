const User = require('../models/User');

exports.getHomePage = (req, res) => {
  res.render('index', { errors: null }); // Pass errors as null when rendering the home page
};

exports.submitForm = async (req, res) => {
  const { name, email, phone, termsAndConditions } = req.body;

  // Validate and sanitize data
  const errors = {};

  // Name validation
  if (!name || name.length < 3 || name.length > 30 || !/^[a-zA-Z\s]+$/.test(name)) {
    errors.name = 'Name must be 3-30 characters long and contain only alphabets.';
  }

  // Email validation
  if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
    errors.email = 'Invalid email address.';
  }

  // Phone validation
  if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    errors.phone = 'Invalid phone number. Must be 10 digits and contain only numbers.';
  }

  // Terms and Conditions validation
  if (!termsAndConditions) {
    errors.termsAndConditions = 'Please agree to the terms and conditions.';
  }

  // If there are validation errors, render the form with errors
  if (Object.keys(errors).length > 0) {
    return res.render('index', { errors }); // Pass the errors object
  }

  // Create a new user object
  const newUser = new User({
    name,
    email,
    phone,
    termsAndConditions: termsAndConditions === 'on' 
  });

  // Save the user to the database
  try {
    await newUser.save();
    res.send('Data submitted successfully!');
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Error occurred while submitting data.');
  }
};
