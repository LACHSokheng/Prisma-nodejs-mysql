const express = require("express");
const service = require("../services/student.service");

const router = express.Router();
//Insert students
router.post("/", service.createStudent);
router.get("/", service.getAllStudents);
router.get("/:id", service.getByStudentId);
router.get("/paging/:pageIndex/:pageSize", service.getAllByPaging);

module.exports = router;
