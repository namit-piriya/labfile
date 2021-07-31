import {model, Schema} from "mongoose";

export const teacherCollection = "teacher"


const teacherSchema = new Schema({
    email: {
        type: String, required: true
    },
    name: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    dept: {
        type: String, required: true
    },
}, {timestamps: true, versionKey: false})

export const TeacherModel = model(teacherCollection, teacherSchema)
