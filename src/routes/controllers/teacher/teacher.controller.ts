import _ from "lodash";
import {SuccessResponse} from "../../../utility/ApiResponse.util";
import TeacherRepo, {Teacher} from "../../../database/repos/Teacher.repo";
import {hashHelper} from "../../../utility/bcrypt.util";
import {users} from "../../../configs/constants";
import {loginController} from "../login.controller";

export const registerTeacherController = async (req, res, next) => {
    const teacher = _.pick(req.body, ["email", "name", "password", "dept"]) as Teacher;
    teacher.password = await hashHelper.hashPassword(teacher.password);
    const savedTeacher = await TeacherRepo.saveTeacher(teacher);
    return new SuccessResponse("success", savedTeacher).send(res);
}

export const loginTeacherController = async (req, res, next) => {
    req.body.user = users.TEACHER;
    return loginController(req,res,next);
}
