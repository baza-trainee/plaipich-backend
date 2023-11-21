const Projects = require("../models/projectsModel");
const catchAsync = require("../utils/cathAsync");
const AppError = require("../utils/appError");

exports.createProject = catchAsync(async (req, res) => {
  const project = await Projects.create(req.body);
  res.status(201).json(project);
});

exports.getAllProjects = catchAsync(async (req, res) => {
  const projects = await Projects.find();
  res.status(200).json(projects);
});

exports.getProjectById = catchAsync(async (req, res, next) => {
  const project = await Projects.findById(req.params.id);

  if (!project) return next(new AppError("No project with such id", 404));

  res.status(200).json(project);
});

exports.updateProject = catchAsync(async (req, res, next) => {
  const project = await Projects.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) return next(new AppError("No project with such id", 404));

  res.status(200).json(project);
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  const project = await Projects.findByIdAndDelete(req.params.id);

  if (!project) return next(new AppError("No project with such id", 404));

  res.status(204).json({
    status: "deleted",
    data: null,
  });
});
