import {Document, model, Schema} from "mongoose";

export const subjectCollection = "subject"

export interface subject {
    name: string;
    dept: string;
    sem: number;
}

export interface SubjectDB extends subject, Document {
}

const subjectSchema = new Schema({
    name: {
        type: String,
    },
    dept: {
        type: String,
    },
    sem: {
        type: Number,
    },
}, {timestamps: true, versionKey: false})

export const SubjectModel = model<SubjectDB>(subjectCollection, subjectSchema)
