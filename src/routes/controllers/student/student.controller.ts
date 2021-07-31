import _ from "lodash";
import {Student, StudentRepo} from "../../../database/repos/Student.repo";
import {SuccessResponse} from "../../../utility/ApiResponse.util";
import {hashHelper} from "../../../utility/bcrypt.util";
import {loginController} from "../login.controller";
import {users} from "../../../configs/constants";

export const registerStudentController = async (req, res, next) => {
    const student = _.pick(req.body, ["email", "name", "password", "sem", "dept", "enrollNo"]) as Student;
    student.password = await hashHelper.hashPassword(student.password);
    const savedStudent = (await StudentRepo.saveStudent(student)).toJSON() as Student;
    delete savedStudent.password;
    return new SuccessResponse("success", savedStudent).send(res);
}

export const loginStudentController = async (req, res, next) => {
    req.body.user = users.STUDENT;
    return loginController(req,res,next);
}
