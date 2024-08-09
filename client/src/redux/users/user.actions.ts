import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserService} from "../../modules/users/services/UserService";
import {AuthUtil} from "../../util/AuthUtil";
import {UserView} from "../../modules/users/models/UserView";
import {AddressView} from "../../modules/users/models/AddressView";

export const registerUserAction: any = createAsyncThunk('users/registerUserAction',
    async (user: UserView, {rejectWithValue}): Promise<{ msg: string } | any> => {
        try {
            let response = await UserService.registerUser(user);
            return response.data;
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })

export const loginUserAction: any = createAsyncThunk('users/loginUserAction', async (user: UserView, {rejectWithValue}): Promise<{ msg: string, token: string, user: UserView } | any> => {
    try {
        let response = await UserService.loginUser(user);
        return response.data;
    } catch (err: any) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

// PRIVATE URL
export const getUserInformationAction: any = createAsyncThunk('users/getUserInformationAction', async (user: UserView, {rejectWithValue}): Promise<{ user: UserView } | any> => {
    try {
        if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
            let response = await UserService.getUserData();
            return response.data;
        }
    } catch (err: any) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})


// PRIVATE URL
export const updateProfilePictureAction: any = createAsyncThunk('users/updateProfilePictureAction', async (imageUrl: string, {rejectWithValue}): Promise<{ user: UserView } | any> => {
    try {
        if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
            let response = await UserService.uploadProfilePicture(imageUrl);
            return response.data;
        }
    } catch (err: any) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})


// PRIVATE URL
export const changePasswordAction: any = createAsyncThunk('users/changePasswordAction', async (password: string, {rejectWithValue}): Promise<{ user: UserView, msg: string } | any> => {
    try {
        if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
            let response = await UserService.changePassword(password);
            return response.data;
        }
    } catch (err: any) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

// PRIVATE URL
export const createNewAddressAction: any = createAsyncThunk('users/createNewAddressAction', async (address: AddressView, {rejectWithValue}): Promise<{ address: AddressView, msg: string } | any> => {
    try {
        if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
            let response = await UserService.createNewAddress(address);
            return response.data;
        }
    } catch (err: any) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

// PRIVATE URL
export const updateAddressAction: any = createAsyncThunk('users/updateAddressAction', async (payload: { address: AddressView, addressId: string }, {rejectWithValue}): Promise<{ address: AddressView, msg: string } | any> => {
    try {
        const {address, addressId} = payload;
        if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
            let response = await UserService.updateAddress(address, addressId);
            return response.data;
        }
    } catch (err: any) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

// PRIVATE URL
export const getAddressAction: any = createAsyncThunk('users/getAddressAction', async (payload: {}, {rejectWithValue}): Promise<AddressView | any> => {
    try {
        if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
            let response = await UserService.getAddress();
            return response.data;
        }
    } catch (err: any) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

// PRIVATE URL
export const deleteAddressAction: any = createAsyncThunk('users/deleteAddressAction', async (payload: { addressId: string }, {rejectWithValue}): Promise<{ msg: string } | any> => {
    try {
        const {addressId} = payload;
        if (AuthUtil.setTokenToRequestHeader()) { // always set this for private urls
            let response = await UserService.deleteAddress(addressId);
            return response.data;
        }
    } catch (err: any) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})