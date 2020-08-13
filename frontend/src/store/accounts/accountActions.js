import * as accountTypes from './accountTypes';
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
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: accountTypes.AUTH_ERROR
      });
    });
};

// LOGIN USER
export const login = (payload) => dispatch => {
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
          val: res.data.token
        });
    })
    .catch(err => {
      console.error(err);
      toast.error("Failed to login! Some error occurred.", toastOptions);
      dispatch({
        type: accountTypes.LOGIN_FAIL
      });
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
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: accountTypes.REGISTER_FAIL
      });
    });
  }
}

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  try {
    dispatch({
        type: accountTypes.LOGOUT_SUCCESS
      });
  }
  catch(err) {
    dispatch(returnErrors(err.response.data, err.response.status));
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



