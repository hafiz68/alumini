const express =  require("express");

const userController = require('../controllers/userControllers');


const router = express.Router();
router.post("/signup",  userController.signup);
router.get("/verifyEmail/:token" , userController.verifyEmail);
router.get("/verifyEmailByStudent/:token" , userController.verifyEmailByStudent);
router.post("/resendverifyEmail" , userController.resendVerifyMail);
router.post("/signin",  userController.signInUser);
router.put("/updateUser/:id",  userController.updateUser);
router.put("/updatePass/:id",  userController.updatePass);
router.put("/forgetPass",  userController.forgetPass);
router.get("/allUsers",  userController.allCustomers);
router.get("/userBYId/:id",  userController.getById);
router.delete("/deleteUser/:id",  userController.deleteUser);
router.post("/uploadPicture",  userController.updateProfilePicture);





module.exports = router;