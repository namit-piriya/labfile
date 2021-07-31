import {TeacherModel} from "../models/Teacher.model";

export interface Teacher {
    email: string;
    password: string;
    name: string;
    dept: string;
}

export default class TeacherRepo {
    public static async saveTeacher(teacher: Teacher) {
        return TeacherModel.create(teacher);
    }
}
