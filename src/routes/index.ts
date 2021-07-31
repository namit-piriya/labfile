import express from "express";
import {studentRouter} from "./controllers/student";
import {teacherRouter} from "./controllers/teacher";

const router = express.Router();

router.use("/student", studentRouter)
router.use("/teacher", teacherRouter)

export const appRouter = router;
