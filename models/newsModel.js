const mongoose = require("mongoose");
const category = require("../commons/constants.js")

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: {
    en: { type: String, enum: category.enCategory, required: true },
    uk: { type: String, enum: category.ukCategory, required: true },
  },
  enTitle: { type: String, required: true },
  enDescription: { type: String, required: true },
  mainPhoto: { type: String, required: true },
  photos: [{ type: String }],
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
