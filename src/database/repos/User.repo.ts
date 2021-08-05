import {StudentModel} from "../models/Student.model";
import {users} from "../../configs/constants";
import {TeacherModel} from "../models/Teacher.model";
import {Document, Model, Types} from "mongoose";

export type credentials = { email: string; };

export abstract class UserRepo {

    static getModel(user) {
        let model = null as Model<any>;
        if (user === users.STUDENT)
            model = StudentModel;
        else if (user === users.TEACHER)
            model = TeacherModel;
        return model;
    }

    public static async checkCredentials(credentials: credentials, user: string) {
        const query = {
            email: credentials.email,
        };
        const model = UserRepo.getModel(user);
        return model.findOne(
            query,
            "email password dept name"
        ).lean().exec() as Promise<StudentDetailWithPass>;
    }

    public static async findUser(user, id) {
        const model = UserRepo.getModel(user);
        return model.findById(id, "_id").exec();
    };
}


export interface StudentDetailWithPass extends Document {
    _id: Types.ObjectId;
    email: string;
    password: string;
    dept: string;
    name: string;
};
