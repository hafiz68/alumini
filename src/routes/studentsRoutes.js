const express =  require("express");
const studentsController = require('../controllers/students');


const router = express.Router();
router.post("/newStud",  studentsController.createStudent);
router.get("/allStudents",  studentsController.allStudents);
router.get("/Students/:id",  studentsController.studentsByid);
router.get("/Student",  studentsController.studentsByBatch);



module.exports = router;