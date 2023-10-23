const express = require("express");
const service = require("../services/tutorial.service");

const router = express.Router();

router.post("/", service.createTutorial);
router.get("/", service.getAllTutorial);

module.exports = router;
