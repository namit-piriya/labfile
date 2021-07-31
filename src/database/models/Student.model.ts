import {model, Schema} from "mongoose";

export const studentCollection = "student"


const studentSchema = new Schema({
    email: {
        type: String, required: true
    },
    enrollNo: {
        type: String, required: true
    },
    name: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    sem: {
        type: String, required: true
    },
    dept: {
        type: String, required: true
    },
}, {timestamps: true, versionKey: false})

export const StudentModel = model(studentCollection, studentSchema)
