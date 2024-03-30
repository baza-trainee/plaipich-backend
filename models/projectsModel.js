const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
  publicStatus: { type: Boolean, default: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: Boolean,
    required: true,
  },
  enTitle: { type: String, required: true },
  enDescription: { type: String, required: true },
  poster: { type: String, required: true },
  detailDesc: {
    start: { type: String, required: true },
    enStart: { type: String, required: true },
    text: [{ type: String, required: true }],
    enText: [{ type: String, required: true }],
    image: [{ type: String, required: true }],
  },
  mission: {
    image: { type: String },
    title: { type: String },
    list: [{ type: String }],
    enTitle: { type: String },
    enList: [{ type: String }],
  },
  projectProgram: {
    title: { type: String },
    enTitle: { type: String },
    list: [{ type: String }],
    enList: [{ type: String }],
    image: { type: String },
  },
  partners: [
    {
      name: { type: String },
      logo: { type: String },
    },
  ],
  support: {
    text: { type: String },
    enText: { type: String },
    logo: { type: String },
  },
  videos: [{ type: String }],
  photos: [{ type: String }],
  locations: {
    title: { type: String },
    enTitle: { type: String },
    text: { type: String },
    enText: { type: String },
    link: { type: String },
  },
});

const Projects = mongoose.model("Projects", projectsSchema);

module.exports = Projects;
