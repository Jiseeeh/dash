export enum Role {
    User = "User",
    Admin = "Admin",
}

export interface User {
    id: number;
    username:string;
    email: string;
    role: Role;
    password?: string;
}