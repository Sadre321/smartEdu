const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authControllers");

router.post("/register",authControllers.createUser);
router.post("/login",authControllers.loginUser);
router.get("/logout",authControllers.logoutUser);
router.get("/dashboard",authControllers.getDashboard);
router.delete("/:id",authControllers.deleteUser);

module.exports = router;