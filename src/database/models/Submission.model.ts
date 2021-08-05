import {model, Schema, Types} from "mongoose";

export const submission = "submission"


const submissionSchema = new Schema({
    subject: {
        type: Types.ObjectId,
        ref: "subjects",
        required: true
    },
    subjectName: {
        type: String,
    },
    student: {
        type: Types.ObjectId,
        ref: "students",
        required: true
    },
    studentName: {
        type: String,
    },
    submissionDate: {
        type: Number,
        default: Date.now
    }
}, {timestamps: true, versionKey: false})

export const SubmissionModel = model(submission, submissionSchema)
