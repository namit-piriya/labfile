import express from "express"
import {asyncHandler} from "../../../middlewares/asyncHandler";
import {loginStudentController, registerStudentController} from "./student.controller";
import {loginController} from "../login.controller";

const router = express.Router();

router.post("/register", asyncHandler(registerStudentController));
router.post("/login", asyncHandler(loginStudentController));

export const studentRouter = router;
