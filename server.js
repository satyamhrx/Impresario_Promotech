const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const routes = require('./routes/routes.js'); 
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://Satyam:Satyam@cluster.dtikt.mongodb.net/', {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.error('Error connecting to MongoDB Atlas:',
err));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);
app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});