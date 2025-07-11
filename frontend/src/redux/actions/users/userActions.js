import API from '../../../api/axios';

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
} from '../actionTypes';

export const registerUser = (name, email, password) => {
  return async dispatch => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      console.log('Attempting registration with:', { name, email, password });
      console.log('API URL being used:', process.env.REACT_APP_API_URL);
      console.log('Full API instance config:', API.defaults.baseURL);
      
      const { data } = await API.post(
        '/api/users/register',
        {
          name,
          email,
          password,
        },
        config
      );
      console.log(name, email, password);
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      //Save the user into localstorage
      localStorage.setItem('userAuthData', JSON.stringify(data));
    } catch (error) {
      console.log('Registration error details:', error);
      console.log('Error response:', error.response);
      console.log('Error message:', error.message);
      console.log('Error status:', error.response?.status);
      console.log('mongdb error', error);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const loginUser = (email, password) => {
  return async dispatch => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      console.log('Attempting login with:', { email, password });
      console.log('API URL being used:', process.env.REACT_APP_API_URL);
      console.log('Full API instance config:', API.defaults.baseURL);
      
      const { data } = await API.post(
        '/api/users/login',
        { email, password },
        config
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userAuthData', JSON.stringify(data));
    } catch (error) {
      console.log('Login error details:', error);
      console.log('Error response:', error.response);
      console.log('Error message:', error.message);
      console.log('Error status:', error.response?.status);
      // Every error has a response.data where we can grab the error and display to the user
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response?.data?.message || error.message, //The message is a key for our error message in our routes
      });
    }
  };
};

export const loadUserFromStorage = () => {
  return dispatch => {
    const userAuthData = localStorage.getItem('userAuthData');
    if (userAuthData) {
      const userData = JSON.parse(userAuthData);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userData,
      });
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    localStorage.removeItem('userAuthData');
    try {
      dispatch({
        type: USER_LOGOUT,
      });
    } catch (error) {}
  };
};

//Since this is an authenticated request that need a token we have to get the token from store and pass it to our action
//But lucky to us dispatch takes another argument which represent all our data in our store

export const getUserProfile = () => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: USER_PROFILE_REQUEST,
      });
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await API.get('/api/users/profile', config);
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};

export const updateUser = (name, email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
        loading: true,
      });
      // Get the token of the user from store because that's what our endpoint need
      const { userInfo } = getState().userLogin;
      console.log(userInfo.token);
      //Create a config and pass to axios for authentication
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await API.put(
        '/api/users/profile/update',
        { name, email, password },
        config
      );
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const fetchUsers = () => {
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_USERS_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await API.get('/api/users', config);
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

//Update user profile (alias for updateUser)
export const updateUserProfile = updateUser;