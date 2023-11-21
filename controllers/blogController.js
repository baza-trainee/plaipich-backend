const Blog = require('../models/blogModel');

exports.createBlogPost = async (req, res) => {
  try {
    const blogPost = await Blog.create(req.body);
    res.status(201).json(blogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await Blog.find();
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogPostById = async (req, res) => {
  try {
    const blogPost = await Blog.findById(req.params.id);
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlogPost = async (req, res) => {
  try {
    const blogPost = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
