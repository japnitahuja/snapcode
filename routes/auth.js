const express = require("express");
const router = express.Router();
require("dotenv").config();

//import controllers
const authController = require("../controllers/auth");

//import middlewares
const authMiddleware = require("../middlewares/auth");

//api routes
router.post(
  "/authenticate",
  authMiddleware.authenticate,
  authController.returnuser
);

router.post("/login",authController.login);

router.post("/logout",authController.logout);

module.exports = router;
