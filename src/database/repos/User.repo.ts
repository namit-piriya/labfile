import {StudentModel} from "../models/Student.model";
import {users} from "../../configs/constants";
import {TeacherModel} from "../models/Teacher.model";
import {Document, Types} from "mongoose";

export type credentials = { email: string; };

export abstract class UserRepo {
    public static async checkCredentials(credentials: credentials, user: string) {
        const query = {
            email: credentials.email,
        };
        if
        (user === users.STUDENT)
            return StudentModel.findOne(
                query,
                "email password dept name"
            ).lean().exec() as Promise<StudentDetailWithPass>;
        else if (user === users.TEACHER)
            return TeacherModel.findOne(query,
                "email password dept name"
            ).lean().exec() as Promise<StudentDetailWithPass>;
    }
}


// type with email password dept name as string
export interface StudentDetailWithPass extends Document {
    _id: Types.ObjectId;
    email: string;
    password: string;
    dept: string;
    name: string;
};
