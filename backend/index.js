require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/user');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('MONGODB_LINK', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(blogRoutes);
app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

