const Blog = require("../models/blogModel");
const catchAsync = require("../utils/cathAsync");
const AppError = require("../utils/appError");

exports.createBlogPost = catchAsync(async (req, res) => {
  const blogPost = await Blog.create(req.body);
  res.status(201).json(blogPost);
});

exports.getAllBlogPosts = catchAsync(async (req, res) => {
  const blogPosts = await Blog.find();
  res.status(200).json(blogPosts);
});

exports.getBlogPostById = catchAsync(async (req, res, next) => {
  const blogPost = await Blog.findById(req.params.id);

  if (!blogPost) return next(new AppError("No blog with such id"), 404);

  res.status(200).json(blogPost);
});

exports.updateBlogPost = catchAsync(async (req, res, next) => {
  const blogPost = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!blogPost) return next(new AppError("No blog with such id"), 404);

  res.status(200).json(blogPost);
});

exports.deleteBlogPost = catchAsync(async (req, res, next) => {
  const blogPost = await Blog.findByIdAndDelete(req.params.id);

  if (!blogPost) return next(new AppError("No blog with such id"), 404);

  res.status(204).json({
    status: "deleted",
    data: null,
  });
});
