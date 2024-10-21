const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    validate: {
      validator: (name) => {
        const nameRegex = /^[A-Za-z\s]+$/; 
        return nameRegex.test(name);
      },
      message: 'Name must be 3-30 characters long and contain only alphabets and spaces.'
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
        const phoneRegex = /^[0-9]{10}$/; 
        return phoneRegex.test(phone);
      },
      message: 'Phone number must be exactly 10 digits and numeric.'
    }
  },
  termsAndConditions: {
    type: Boolean,
    required: true,
    validate: {
      validator: (value) => value === true, 
      message: 'You must accept the terms and conditions.'
    }
  }
});

const User = mongoose.model('User', userSchema);

exports.getHomePage = (req, res) => {
  res.render('index', { errors: null, data: null }); 
};

exports.submitForm = async (req, res) => {
  const { name, email, phone, termsAndConditions } = req.body;

  const errors = {};

  if (!name || name.trim().length < 3 || name.trim().length > 30 || !/^[a-zA-Z\s]+$/.test(name.trim())) {
    errors.name = 'Name must be 3-30 characters long and contain only alphabets and spaces.';
  }

  if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email.trim())) {
    errors.email = 'Invalid email address.';
  }

  if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    errors.phone = 'Phone number must be 10 digits and contain only numbers.';
  }

  if (!termsAndConditions) {
    errors.termsAndConditions = 'You must agree to the terms and conditions.';
  }

  if (Object.keys(errors).length > 0) {
    return res.render('index', { 
      errors, 
      data: { name, email, phone, termsAndConditions } 
    });
  }

  const newUser = new User({
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    termsAndConditions: termsAndConditions === 'on'
  });

  try {
    await newUser.save();
    res.send('Data submitted successfully!');
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Error occurred while submitting data.');
  }
};
