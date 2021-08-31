import {model, Schema, Types} from "mongoose";

export const teacherSubject = "teacherSubject"


const teacherSubjectSchema = new Schema({
    // will be used when we fetch assigned subjects to a teacher
    subjectName: {
        type: String,
    },
    subject: {
        type: Types.ObjectId,
    },
    dept: {
        type: String,
    },
    teacher: {
        type: Types.ObjectId,
    },
}, {timestamps: true, versionKey: false})

export const TeacherSubjectModel = model(teacherSubject, teacherSubjectSchema)
