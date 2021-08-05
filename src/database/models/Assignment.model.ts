import {model, Schema, Types} from "mongoose";

export const assignmentCollection = "assignment"


const assignmentSchema = new Schema({
    subject: {
        type: Types.ObjectId,
        ref: "subjects",
        required: true
    },
    subjectName: {
        type: String,
    },
    description: {
        type: String,
    },
    dept: {
        type: String,
    },
    sem: {
        type: Number,
    },
    dueDate: {
        type: Number,
        default: Date.now
    },
}, {timestamps: true, versionKey: false})

export const AssignmentModel = model(assignmentCollection, assignmentSchema)
