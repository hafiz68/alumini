const express =  require("express");
const qualificationController = require('../controllers/qualificationControllers');


const router = express.Router();
router.post("/newQualification",  qualificationController.createQualification);
router.get("/allQalification",  qualificationController.allQualifications);
router.delete("/delQualification/:id",  qualificationController.deleteQualification);
router.get("/QualificationByUserId",  qualificationController.getByUserId);
router.post("/updateQualification/:id",  qualificationController.updatedQualification);



module.exports = router;