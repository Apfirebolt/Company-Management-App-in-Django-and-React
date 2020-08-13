import * as accountTypes from './accountTypes';
import * as companyTypes from '../company/companyTypes';
import authInstance from '../../interceptors/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const toastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: accountTypes.USER_LOADING });

  authInstance
    .get("accounts/api/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: accountTypes.USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      console.error(err);
    });
};

// LOGIN USER
export const login = (payload) => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  authInstance
    .post("accounts/api/login", payload, config)
    .then(res => {
      toast.success("You are successfully logged in!", toastOptions);
      dispatch({
          type: accountTypes.LOGIN_SUCCESS,
          val: res.data
        })
    })
    .catch(err => {
      console.error(err);
      toast.error("Failed to login! Some error occurred.", toastOptions);
    });
};

// REGISTER USER
export const register = (payload) => {
  return (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  authInstance
    .post("accounts/api/register", payload, config)
    .then(res => {
      dispatch({
        type: accountTypes.REGISTER_SUCCESS,
        val: res.data.token
      });
      toast.success(`${payload.username}, You have been successfully registered!`, toastOptions);
    })
    .catch(err => {
      console.error(err);
      toast.error("Failed to register! Some error occurred.", toastOptions);
    });
  }
}

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  try {
    dispatch({
        type: accountTypes.LOGOUT_SUCCESS
      });
    dispatch({
        type: companyTypes.LIST_COMPANY,
        val: null
      });
  }
  catch(err) {
    console.error(err);
    toast.error("Failed to logout! Some error occurred.", toastOptions);
  }
};

// Setup config with token - helper function
export const tokenConfig = getState => {
  // Get token from state
  const token = getState().accounts.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};



