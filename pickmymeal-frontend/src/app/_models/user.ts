import { Role } from './role';

// Identifying information for a single user
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