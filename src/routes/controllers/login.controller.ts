import {hashHelper} from "../../utility/bcrypt.util";
import {SuccessResponse} from "../../utility/ApiResponse.util";
import {jwtHelp} from "../../utility/JWT.util";
import {UserRepo} from "../../database/repos/User.repo";
import {Types} from "mongoose";

export const loginController = async (req, res, next) => {
    const {email, password, user} = req.body;
    let userDetails = await UserRepo.checkCredentials({email}, user)
    if (!userDetails) throw new Error("User does not exist!");
    const {name, dept, _id, sem = null} = userDetails
    const userVerified = await hashHelper.verifyPassword(password, userDetails.password);
    if (!userVerified) throw new Error("Email or password is incorrect");
    const tokenPayload = {
        email,
        name,
        dept,
        userType: user,
        id: _id
    } as TokenPayload;
    if (sem) tokenPayload.sem = sem;
    const token = await jwtHelp.signToken(tokenPayload);
    return new SuccessResponse("Successfully logged in", {...tokenPayload, token}).send(res);
}

export interface TokenPayload {
    id: string | Types.ObjectId;
    email: string;
    name: string;
    dept: string;
    userType: string;
    sem?: number;
}
