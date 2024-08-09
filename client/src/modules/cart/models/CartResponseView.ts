export interface CartResponseView {
    msg: string;
    cart: Cart;
}

export interface Cart {
    _id: string;
    products?: (ProductsEntity)[] | null;
    total: number;
    tax: number;
    grandTotal: number;
    userObj: UserObj;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ProductsEntity {
    product: Product;
    count: number;
    price: number;
    _id: string;
}

interface Product {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    brand: string;
    price: number;
    quantity: number;
    sold: number;
    userObj: string;
    categoryObj: string;
    subCategoryObj: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface UserObj {
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
