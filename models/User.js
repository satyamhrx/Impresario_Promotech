const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    validate: {
      validator: (name) => {
        const nameRegex = /^[A-Za-z]+$/; // Only allows alphabets
        return nameRegex.test(name);
      },
      message: 'Name must be only alphabets and between 3 to 30 characters.'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        return emailRegex.test(email);
      },
      message: 'Invalid email format.'
    }
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (phone) => {
        const phoneRegex = /^[0-9]{10}$/; // Only 10-digit numbers
        return phoneRegex.test(phone);
      },
      message: 'Phone number must be exactly 10 digits and numeric.'
    }
  },
  termsAndConditions: {
    type: Boolean,
    required: true,
    validate: {
      validator: (value) => value === true, // Must be checked (true)
      message: 'You must accept the terms and conditions.'
    }
  }
});

// Export the user model
module.exports = mongoose.model('User', userSchema);
