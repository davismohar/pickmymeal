import { Role } from './role';

export class User {
    token: string;
    username: string;
    _id: string;
    password: string;
    email: string;
    role: Role;
    courses: string[];
    firstName: string;
    lastName: string;
}