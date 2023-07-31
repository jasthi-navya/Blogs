const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/api/blogs', authenticateToken, async (req, res) => {
  const { title, content, name } = req.body;
  const userId = req.user._id;
  try {
    const blog = new Blog({
      title,
      content,
      name,
      userId
    });

    const b = await blog.save();

    res.status(201).json({ message: 'Blog saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving blog' });
  }
});

router.get('/api/blogs', (req, res) => {
  const { search } = req.query;

  let query = {};

  if (search) {
    query = { title: { $regex: search, $options: 'i' } };
  }

  Blog.find(query)
    .then((blogs) => res.json(blogs))
    .catch((error) => res.status(500).json({ message: 'Error showing Blogs' }));
});

router.get('/api/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  Blog.findById(blogId)
    .then((blog) => {
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json(blog);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.get('/my-blogs', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const blogs = await Blog.find({ userId });
    res.json({blogs});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving blogs' });
  }
});

module.exports = router;
