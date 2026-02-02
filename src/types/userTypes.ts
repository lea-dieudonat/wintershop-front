export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
}

export interface UpdateUserDto {
    firstName: string;
    lastName: string;
}