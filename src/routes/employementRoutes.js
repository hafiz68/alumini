const express =  require("express");
const employementController = require('../controllers/employementController');


const router = express.Router();
router.post("/newEmployement",  employementController.createEmployement);
router.get("/allEmployement",  employementController.allEmployements);
router.delete("/delEmployement/:id",  employementController.deleteEmployement);
router.get("/EmployementByUserId",  employementController.getEmpByUserId);
router.post("/updateEmployement/:id",  employementController.updatedEmployement);



module.exports = router;