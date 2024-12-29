const express = require("express");
const router = express.Router();

const pageController = require("../controllers/pageControllers");

router.get("/",pageController.getHomePage);
router.get("/about",pageController.getAboutPage);
router.get("/contact",pageController.getContactPage);
router.post("/contact",pageController.postContact);
router.get("/auth/register",pageController.getRegisterPage);
router.get("/auth/login",pageController.getLoginPage);

module.exports = router;