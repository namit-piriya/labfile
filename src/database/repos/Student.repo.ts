import {StudentModel} from "../models/Student.model";

export interface Student {
    email: string;
    password: string;
    name: string;
    dept: string;
    sem: number;
    enrollNo: string;
}


export class StudentRepo {
    public static async saveStudent(student: Student) {
        return StudentModel.create(student);
    }
}
