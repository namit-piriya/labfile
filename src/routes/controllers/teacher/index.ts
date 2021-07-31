import express from "express"
import {asyncHandler} from "../../../middlewares/asyncHandler";
import {loginTeacherController, registerTeacherController} from "./teacher.controller";

const router = express.Router();

router.post("/register", asyncHandler(registerTeacherController));
router.post("/login", asyncHandler(loginTeacherController));

export const teacherRouter = router;
