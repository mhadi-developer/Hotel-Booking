import type { Role } from "./user";

export type LoggedInUserData = {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    password?: string,
    createdAt?: Date,
    role:Role
};