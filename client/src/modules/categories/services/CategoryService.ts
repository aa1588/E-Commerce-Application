import axios from "axios";
import {CategoryView, SubCategoryView} from "../models/CategoryView";

export class CategoryService {
    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    // PRIVATE
    public static createSubCategory(sub: SubCategoryView, categoryId: string): Promise<{ data: { msg: string } }> {
        let dataUrl = `${this.serverUrl}/api/categories/${categoryId}`;
        return axios.post(dataUrl, sub);
    }

    // PRIVATE
    public static getAllCategories(): Promise<{ data: CategoryView[] }> {
        let dataUrl = `${this.serverUrl}/api/categories`;
        return axios.get(dataUrl);
    }

}