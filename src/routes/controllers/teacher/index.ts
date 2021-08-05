import express from "express"
import {asyncHandler} from "../../../middlewares/asyncHandler";
import {
    assignSubject, createAssignment,
    createSubjects,
    getAssignedSubject,
    loginTeacherController,
    registerTeacherController
} from "./teacher.controller";
import {ExtractJwt, Strategy} from "passport-jwt";
import passport from "passport";
import {UserRepo} from "../../../database/repos/User.repo";
import {TokenPayload} from "../login.controller";
import {secretKey} from "../../../configs/envConfig";

async function callback(tokenPayload: TokenPayload, done) {
    console.log(tokenPayload)
    const user = await UserRepo.findUser(tokenPayload.userType, tokenPayload.id)
    return user ? done(null, tokenPayload) : done("User not found", null);
}

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
    authScheme: "Bearer"
}, callback));

const router = express.Router();

router.post("/register", asyncHandler(registerTeacherController));
router.post("/login", asyncHandler(loginTeacherController));
router.get("/getAssignedSubject", passport.authenticate('jwt', {session: false}), asyncHandler(getAssignedSubject));
router.post("/createSubject", passport.authenticate('jwt', {session: false}), asyncHandler(createSubjects));
router.post("/assignSubject", passport.authenticate('jwt', {session: false}), asyncHandler(assignSubject));
router.post("/createAssignment", passport.authenticate('jwt', {session: false}), asyncHandler(createAssignment));


export const teacherRouter = router;
