import {TeacherModel} from "../models/Teacher.model";
import {Types} from "mongoose";

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

    public static async findTeacher(teacher: Types.ObjectId) {
        return TeacherModel.findById(teacher, "_id");
    }
}
