import {Types} from "mongoose";
import {AssignmentModel} from "../models/Assignment.model";

interface Assignment {
    subject: Types.ObjectId;
    subjectName: string;
    description: string;
    dept: string;
    sem: number;
    dueDate: number;
}

export class AssignmentRepo {
    public static async createAssignment(assignment: Assignment) {
        return AssignmentModel.create(assignment);
    }

}
