const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  name: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
});

const Blog = mongoose.model('Blog', noteSchema);

module.exports = Blog;
