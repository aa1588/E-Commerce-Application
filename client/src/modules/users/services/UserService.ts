import axios from 'axios';
import {UserView} from "../models/UserView";
import {AddressView} from "../models/AddressView";

export class UserService {

    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    // PUBLIC
    public static registerUser(user: UserView): Promise<{ data: { msg: string } }> {
        let dataUrl = `${this.serverUrl}/api/users/register`;
        return axios.post(dataUrl, user);
    }

    // PUBLIC
    public static loginUser(user: UserView): Promise<{ data: { msg: string, token: string, user: UserView } }> {
        let dataUrl = `${this.serverUrl}/api/users/login`;
        return axios.post(dataUrl, user);
    }

    // PRIVATE
    public static getUserData(): Promise<{ data: { user: UserView } }> {
        let dataUrl = `${this.serverUrl}/api/users/me`;
        return axios.get(dataUrl);
    }

    // PRIVATE
    public static uploadProfilePicture(imageUrl: string): Promise<{ data: { user: UserView } }> {
        let dataUrl = `${this.serverUrl}/api/users/profile`;
        return axios.post(dataUrl, {imageUrl});
    }

    // PRIVATE
    public static changePassword(password: string): Promise<{ data: { user: UserView, msg: string } }> {
        let dataUrl = `${this.serverUrl}/api/users/change-password`;
        return axios.post(dataUrl, {password});
    }

    // PRIVATE
    public static createNewAddress(address: AddressView): Promise<{ data: { address: AddressView, msg: string } }> {
        let dataUrl = `${this.serverUrl}/api/addresses/new`;
        return axios.post(dataUrl, address);
    }

    // PRIVATE
    public static updateAddress(address: AddressView, addressId: string): Promise<{ data: { address: AddressView, msg: string } }> {
        let dataUrl = `${this.serverUrl}/api/addresses/${addressId}`;
        return axios.put(dataUrl, address);
    }

    // PRIVATE
    public static getAddress(): Promise<{ data: AddressView }> {
        let dataUrl = `${this.serverUrl}/api/addresses/me`;
        return axios.get(dataUrl);
    }

    // PRIVATE
    public static deleteAddress(addressId: string): Promise<{ data: { msg: string } }> {
        let dataUrl = `${this.serverUrl}/api/addresses/${addressId}`;
        return axios.delete(dataUrl);
    }

}