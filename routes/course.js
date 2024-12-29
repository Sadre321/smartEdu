const express =require("express");
const router = express.Router();

const courseControllers = require("../controllers/coursersControllers");
const roleMiddlewares = require("../midllewares/roleMiddlewares");

router.get("/",courseControllers.getCourses);
router.get("/:slug",courseControllers.getCourseDetails);
router.delete("/:slug",courseControllers.deleteCourse);
router.put("/:slug",courseControllers.updateCourse);
router.post("/",roleMiddlewares(["teacher", "admin"]),courseControllers.createCourses);
router.post("/enroll",courseControllers.enrollCourse);
router.post("/relase",courseControllers.relaseCourse);

module.exports = router;