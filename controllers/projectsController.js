const Projects = require("../models/projectsModel");
const catchAsync = require("../utils/cathAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createProject = catchAsync(async (req, res) => {
  if (req.user) {
    const project = await Projects.create(req.body);
    res.status(201).json(project);
  } else {
    res.status(401).json("Не авторизований користувач!");
  }
});

exports.getAllProjects = catchAsync(async (req, res) => {
  const searchReq = req.user ? {} : { publicStatus: true };

  const features = new APIFeatures(
    Projects.find(searchReq, {
      publicStatus: 1,
      poster: 1,
      title: 1,
      enTitle: 1,
      description: 1,
      enDescription: 1,
      status: 1,
    }),
    req.query
  )
    .filter()
    .sort()
    .paginate()
    .limitFields();

  const projects = await features.query;
  res.status(200).json({
    status: "success",
    results: projects.length,
    data: { projects },
  });
});

exports.getProjectById = catchAsync(async (req, res, next) => {
  const project = await Projects.findById(req.params.id);

  if (!project) return next(new AppError("No project with such id", 404));

  res.status(200).json(project);
});

exports.updateProject = catchAsync(async (req, res, next) => {
  if (req.user) {
    const project = await Projects.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) return next(new AppError("No project with such id", 404));

    res.status(200).json(project);
  } else {
    res.status(401).json("Не авторизований користувач!");
  }
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  if (req.user) {
    const project = await Projects.findByIdAndDelete(req.params.id);

    if (!project) return next(new AppError("No project with such id", 404));

    res.status(204).json({
      status: "deleted",
      data: null,
    });
  } else {
    res.status(401).json("Не авторизований користувач!");
  }
});
