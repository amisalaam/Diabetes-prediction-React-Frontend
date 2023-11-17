import {
    LOGOUT,

    REGISTER_FAIL,
    REGISTER_SUCCESS,

    LOGIN_FAIL,
    LOGIN_SUCCESS,

    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,

    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS

} from "../actions/types";

const initialState = {
    access :localStorage.getItem("access"),
    refresh :localStorage.getItem("refresh"),
    isAuthenticated : null,
    user : null
}

export default function (state = initialState,action) {
    const {type,payload} =action ;
    switch (type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated:true,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("access",payload.access);
            return {
                ...state,
                isAuthenticated:true,
                access :payload.access,
                refresh : payload.refresh,
            };
        case REGISTER_SUCCESS:
            localStorage.setItem("access",payload.access);
            return {
                ...state,
                isAuthenticated :true,
                access :payload.access,
                refresh : payload.refresh,
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user : payload,
            }

        case AUTHENTICATED_FAIL :
            return {
                ...state,
                isAuthenticated : false,
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT:
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")

            return {
                ...state,
                access :null,
                refresh : null,
                isAuthenticated:false,
                user : null,
                message: "failed",

            }
        default:
            return state

    }

}