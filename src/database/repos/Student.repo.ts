import {StudentModel} from "../models/Student.model";
import {Document} from "mongoose";
import {AssignmentModel} from "../models/Assignment.model";

export interface Student {
    email: string;
    password: string;
    name: string;
    dept: string;
    sem: number;
    enrollNo: string;
}

export interface StudentDB extends Document {

}

export class StudentRepo {
    public static async saveStudent(student: Student) {
        return StudentModel.create(student);
    }

    public static async getDueAssignments(dept, sem) {
        const assignments =  await AssignmentModel.find({dept, sem},"_id")
        return assignments;
    }

}
