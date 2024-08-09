import axios from 'axios';
import {TokenUtil} from "./TokenUtil";

export class AuthUtil {

    public static setTokenToRequestHeader(): boolean {
        let token = TokenUtil.getToken();
        if (TokenUtil.isLoggedIn() && token) {
            axios.defaults.headers['x-auth-token'] = token;
            return true;
        } else {
            delete axios.defaults.headers['x-auth-token'];
            return false;
        }
    }

}