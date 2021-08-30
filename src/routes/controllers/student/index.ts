import express from "express"
import {asyncHandler} from "../../../middlewares/asyncHandler";
import {getDueAssignmentsController, loginStudentController, registerStudentController} from "./student.controller";
import {TokenPayload} from "../login.controller";
import {UserRepo} from "../../../database/repos/User.repo";
import {secretKey} from "../../../configs/envConfig";
import {ExtractJwt, Strategy} from "passport-jwt";
import passport from "passport";

const router = express.Router();

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

router.post("/register", asyncHandler(registerStudentController));
router.post("/login", asyncHandler(loginStudentController));
router.get("/getDueAssignments", passport.authenticate('jwt', {session: false}), asyncHandler(getDueAssignmentsController));

export const studentRouter = router;
