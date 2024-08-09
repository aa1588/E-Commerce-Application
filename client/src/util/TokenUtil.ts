import {APP_CONSTANTS} from "../constants";

export class TokenUtil {

    public static saveToken(token: string) {
        sessionStorage.setItem(APP_CONSTANTS.REACT_E_COMMERCE_TOKEN, token);
    }

    public static deleteToken() {
        sessionStorage.removeItem(APP_CONSTANTS.REACT_E_COMMERCE_TOKEN);
    }

    public static getToken() {
        return sessionStorage.getItem(APP_CONSTANTS.REACT_E_COMMERCE_TOKEN);
    }

    public static isLoggedIn() {
        let token = sessionStorage.getItem(APP_CONSTANTS.REACT_E_COMMERCE_TOKEN);
        return !!token;
    }
}
