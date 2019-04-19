import { User } from './user';

export class Course{
    _id?: string;
    courseName: string;
    courseCode: string;
    section: string;
    semester: string;
    creator?: User;
}