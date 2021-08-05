import {TeacherSubjectModel} from "../models/TeacherSubject.model";
import {SubjectModel} from "../models/Subject.model";

export class TeacherSubjectRepo {
    public static getAssignedSubject(teacherId) {
        return TeacherSubjectModel.find({teacher: teacherId}, "subjectName subject");
    }

    public static assignSubject(subjectName, sem, dept, teacher, subject) {
        return TeacherSubjectModel.create({subjectName, sem, dept, teacher, subject});
    }
}

export class SubjectRepo {
    public static createSubject(subjectName, sem, dept) {
        return SubjectModel.create({name: subjectName, sem, dept});
    }

    public static findSubject(subject) {
        return SubjectModel.findById(subject);
    }
}
