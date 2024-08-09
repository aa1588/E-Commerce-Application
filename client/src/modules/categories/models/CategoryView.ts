export interface SubCategoryView {
    _id?: string;
    name: string;
    description: string;
    isChecked?: boolean;
}

export interface CategoryView {
    _id?: string;
    name: string;
    description: string;
    isChecked?: boolean;
    subCategories: SubCategoryView[],
    createdAt?: Date;
    updatedAt?: Date;
}