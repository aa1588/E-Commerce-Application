export interface UserView {
    _id?: string;
    username?: string;
    email: string;
    password: string;
    imageUrl?: string;
    isAdmin?: string;
    isSuperAdmin?: string;
    createdAt?: Date;
    updatedAt?: Date;
}