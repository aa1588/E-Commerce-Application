export interface ProductResponseView {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    brand: string;
    price: string;
    quantity: string;
    count: number;
    sold: number;
    userObj: UserObj;
    categoryObj?: CategoryObj;
    subCategoryObj?: SubCategoryObj;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface UserObj {
    _id: string;
    username: string;
    email: string;
    password: string;
    imageUrl: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CategoryObj {
    _id: string;
    name: string;
    description: string;
    subCategories?: (string)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface SubCategoryObj {
    _id: string;
    name: string;
    description: string;
    __v: number;
}
