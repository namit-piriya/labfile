import _ from "lodash";
import {SuccessResponse} from "../../../utility/ApiResponse.util";
import TeacherRepo, {Teacher} from "../../../database/repos/Teacher.repo";
import {hashHelper} from "../../../utility/bcrypt.util";
import {users} from "../../../configs/constants";
import {loginController} from "../login.controller";
import {SubjectRepo, TeacherSubjectRepo} from "../../../database/repos/TeacherSubject.repo";
import {ProtectedRequest} from "../../../utility/types/request";
import {AssignmentRepo} from "../../../database/repos/Assignment.repo";
//TODO: middleware for teacher authorization
const user = users.TEACHER;

export const registerTeacherController = async (req, res, next) => {
    const teacher = _.pick(req.body, ["email", "name", "password", "dept"]) as Teacher;
    teacher.password = await hashHelper.hashPassword(teacher.password);
    const savedTeacher = await TeacherRepo.saveTeacher(teacher);
    return new SuccessResponse("success", savedTeacher).send(res);
}

export const loginTeacherController = async (req, res, next) => {
    req.body.user = users.TEACHER;
    return loginController(req, res, next);
}

export const getAssignedSubject = async (req: ProtectedRequest, res: Response, next) => {
    const subjects = await TeacherSubjectRepo.getAssignedSubject(req.user.id);
    return new SuccessResponse("subjects received successfully", subjects).send(res);
}

export const createSubjects = async (req: ProtectedRequest, res: Response, next) => {
    const {name, sem} = req.body;
    const subjects = await SubjectRepo.createSubject(name, sem, req.user.dept);
    return new SuccessResponse("subjects received successfully", subjects).send(res);
}

export const assignSubject = async (req: ProtectedRequest, res: Response, next) => {
    const {subject, teacher} = req.body;
    const subjectInfo = await SubjectRepo.findSubject(subject);
    if (!subjectInfo) throw new Error("Subject not found!")
    const teacherAvailable = await TeacherRepo.findTeacher(teacher);
    if (!teacherAvailable) throw new Error("Teacher not found!")
    const assigned = await TeacherSubjectRepo.assignSubject(subjectInfo.name, subjectInfo.sem, subjectInfo.dept, teacher, subjectInfo._id);
    return new SuccessResponse("subjects received successfully", assigned).send(res);
}

export const createAssignment = async (req: ProtectedRequest, res: Response, next) => {
    const {subject, date, description} = req.body;
    const subjectInfo = await SubjectRepo.findSubject(subject);
    if (!subjectInfo) throw new Error("Subject not found!");
    const {name} = subjectInfo;
    const assignment = Object.assign({
        subjectName: name,
        dueDate: date,
        subject: subjectInfo._id,
        description
    }, subjectInfo);
    const assigned = await AssignmentRepo.createAssignment(assignment);
    return new SuccessResponse("Success", assigned).send(res);
}
