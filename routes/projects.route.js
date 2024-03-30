const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");
const authenticate = require("../utils/authenticate");

router.post("/projects", authenticate, projectsController.createProject);

router.get("/projects", authenticate, projectsController.getAllProjects);

router.get("/projects/:id", authenticate, projectsController.getProjectById);

router.put("/projects/:id", authenticate, projectsController.updateProject);

router.delete("/projects/:id", authenticate, projectsController.deleteProject);

module.exports = router;
