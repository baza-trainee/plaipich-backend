const News = require("../models/newsModel");
const catchAsync = require("../utils/cathAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createNews = catchAsync(async (req, res) => {
  if (req.user) {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } else {
    res.status(401).json("Не авторизований користувач!");
  }
});

exports.getAllNews = async (req, res) => {
  const searchReq = req.user ? {} : { publicStatus: true };
  const features = new APIFeatures(News.find(searchReq), req.query)
    .filter()
    .sort("-date")
    .paginate()
    .limitFields();

  const news = await features.query;
  res.status(200).json({
    status: "success",
    results: news.length,
    data: { news },
  });
};

exports.getNewsById = catchAsync(async (req, res, next) => {
  const news = await News.findById(req.params.id);
  if (!news) return next(new AppError("No news with such id", 404));

  res.status(200).json(news);
});

exports.updateNews = catchAsync(async (req, res, next) => {
  if (req.user) {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!news) return next(new AppError("No news with such id", 404));

    res.status(200).json(news);
  } else {
    res.status(401).json("Не авторизований користувач!");
  }
});

exports.deleteNews = catchAsync(async (req, res, next) => {
  if (req.user) {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) return next(new AppError("No news with such id", 404));

    res.status(204).json({
      status: "deleted",
      data: null,
    });
  } else {
    res.status(401).json("Не авторизований користувач!");
  }
});
