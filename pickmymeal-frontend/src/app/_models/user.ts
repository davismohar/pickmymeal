import { Role } from './role';

export class User {
    username: string;
    _id: string;
    password: string;
    email: string;
    role: Role;
    token?: string;
    courses: string[];
}