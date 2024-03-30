const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const authenticate = require("../utils/authenticate");

router.post("/news", authenticate, newsController.createNews);

router.get("/news", authenticate, newsController.getAllNews);

router.get("/news/:id", authenticate, newsController.getNewsById);

router.patch("/news/:id", authenticate, newsController.updateNews);

router.delete("/news/:id", authenticate, newsController.deleteNews);

module.exports = router;
