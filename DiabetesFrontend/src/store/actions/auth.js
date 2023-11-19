import {
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
} from './types'
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const API_URL = import.meta.env.VITE_API_URL

export const checkAuthenticated = () => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const body = JSON.stringify({ token: localStorage.getItem("access") });
      try {
          const res = await axios.post(`${API_URL}/api/token/verify/`, body, config);
        if (res.data.code !== "token_not_valid") {
            dispatch({
            type: AUTHENTICATED_SUCCESS,
            payload: { isAuthenticated: true, user: res.data },
          });
        } else {
          dispatch({
            type: AUTHENTICATED_FAIL,
          });
        }
      } catch (err) {
          dispatch({
              type: AUTHENTICATED_FAIL,
            });
      }
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
};

export const signup = (first_name, last_name, email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    const body = JSON.stringify({ first_name, last_name, email, password });

    try {
        const res = await axios.post(`${API_URL}/api/user/register/`, body, config);
        console.log('register Success')
        toast.success(`Welcome to Prediction, ${first_name} ${last_name}`);


        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        return res
        
    } catch (err) {
        if (err.response && err.response.data) {
            if (err.response.data.password) {
                // Display password error messages to the user
                err.response.data.password.forEach((errorMsg) => {
                    toast.error(errorMsg);
                });
            }
            if (err.response.data.email) {
                // Display email error messages to the user
                err.response.data.email.forEach((errorMsg) => {
                    toast.error(errorMsg);
                });
            }
        } else {
            toast.error('An error occurred during signup.');
        }

        dispatch({
            type: SIGNUP_FAIL,
        });
        return err
    }
};

export const load_user = () => async (dispatch) => {
  const accessToken = localStorage.getItem("access")
  console.log(accessToken)
    if (accessToken) {

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      };
      try {
        const res = await axios.get(`${API_URL}/api/user/me/`, config);
        console.log(res,'aaaaaaaaaaaaaaaaaa')
  
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data.access,
          payload: res.data,
        });
         console.log(res.data)
      } catch (err) {
        console.log(err);
        dispatch({
          type: USER_LOADED_FAIL,
        });
      }
    } else {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  };


export const login = (email, password) => async (dispatch) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${API_URL}/api/token/`, body, config);
        console.log(res)
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
            isAuthenticated: true,
            
        });
        
        dispatch(load_user());
        return res;

    } catch (err) {
        console.log(err)
        if (err.response && err.response.data && err.response.data.detail) {
            const errorMessage = err.response.data.detail;
            toast.error(errorMessage);
        } else {
            toast.error('Login failed. Please try again.');
        }

        dispatch({
            type: LOGIN_FAIL,
        });
        return err
    }
};