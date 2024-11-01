const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  requireSignIn,
} = require("../controllers/userController");

//router object
const router = express.Router();

//routes
//Register route || post
router.post("/register", registerController);

//Login route || post
router.post("/login", loginController);

//Update route || put
router.put("/user-updation", requireSignIn, updateUserController);

//export
module.exports = router;
