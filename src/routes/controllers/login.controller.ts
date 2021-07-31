import {hashHelper} from "../../utility/bcrypt.util";
import {SuccessResponse} from "../../utility/ApiResponse.util";
import {jwtHelp} from "../../utility/JWT.util";
import {UserRepo} from "../../database/repos/User.repo";

export const loginController = async (req, res, next) => {
    const {email, password, user} = req.body;
    let userDetails = await UserRepo.checkCredentials({email}, user)
    const userVerified = await hashHelper.verifyPassword(password, userDetails.password);
    if (!userVerified) throw new Error("Email or password is incorrect");
    const tokenPayload = {email, name: userDetails.name, dept: userDetails.dept};
    const token = await jwtHelp.signToken(tokenPayload);
    const response = {
        userType: user,
        token,
        email,
        dept: userDetails.dept
    };
    return new SuccessResponse("successfully logged in", response).send(res);
}
