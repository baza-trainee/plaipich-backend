const News = require("../models/newsModel");
const catchAsync = require("../utils/cathAsync");
const AppError = require("../utils/appError");

exports.createNews = catchAsync(async (req, res) => {
  const news = await News.create(req.body);
  res.status(201).json(news);
});

exports.getAllNews = async (req, res) => {
  const news = await News.find();
  res.status(200).json(news);
};

exports.getNewsById = catchAsync(async (req, res, next) => {
  const news = await News.findById(req.params.id);
  if (!news) return next(new AppError("No news with such id", 404));

  res.status(200).json(news);
});

exports.updateNews = catchAsync(async (req, res, next) => {
  const news = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!news) return next(new AppError("No news with such id", 404));

  res.status(200).json(news);
});

exports.deleteNews = catchAsync(async (req, res, next) => {
  const news = await News.findByIdAndDelete(req.params.id);

  if (!news) return next(new AppError("No news with such id", 404));

  res.status(204).json({
    status: "deleted",
    data: null,
  });
});
