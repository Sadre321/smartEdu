const express =require("express");
const router = express.Router();

const categoryControllers = require("../controllers/categoryControllers");

router.post("/",categoryControllers.createCategory);

module.exports = router;