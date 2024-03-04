const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/projects",
  upload.array("files"),
  projectsController.createProject
);

router.get("/projects", projectsController.getAllProjects);

router.get("/projects/:id", projectsController.getProjectById);

router.put("/projects/:id", projectsController.updateProject);

router.delete("/projects/:id", projectsController.deleteProject);

module.exports = router;
