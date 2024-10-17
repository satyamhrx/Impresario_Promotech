const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const routes = require('./routes/routes.js'); // Import routes from routes.js
const app = express();
const port = process.env.PORT || 3000;
// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://Satyam:Satyam@cluster.dtikt.mongodb.net/', {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.error('Error connecting to MongoDB Atlas:',
err));
// Set up EJS for templating
app.set('view engine', 'ejs');
// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
// Use routes
app.use('/', routes);
app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});