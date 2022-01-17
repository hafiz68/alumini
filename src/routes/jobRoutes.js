const express =  require("express");
const jobController = require('../controllers/jobController');


const router = express.Router();
router.post("/newJob",  jobController.createJob);
router.get("/allJob",  jobController.allJobs);
router.delete("/delJob/:id",  jobController.deleteJob);
router.get("/JobByUserId",  jobController.getJobsByUserId);
router.post("/updateJob/:id",  jobController.updatedJob);



module.exports = router;