import { RSAA } from 'redux-api-middleware';
import {
  LOAD_USER,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  getUser
} from './reducer';

export const loadUser = id => (dispatch, getState, api) =>
  dispatch({
    [RSAA]: {
      endpoint: `/api/v1/users/${id}`,
      method: 'GET',
      types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILURE]
    }
  });

export const logout = () => ({ type: LOGOUT });

export const login = (username, password) => (dispatch, getState, api) =>
  dispatch({
    [RSAA]: {
      method: 'POST',
      endpoint: '/api/v1/login',
      body: JSON.stringify({ username, password }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      types: [LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE]
    }
  });

export const loginAndLoadUser = (username, password) => async (dispatch, getState, api) => {
  console.log('loginAndLoadUser', username, password);
  await dispatch(login(username, password));
  const user = getUser(getState());
  console.log('post dispatch', user.id);
  return dispatch(loadUser(user.id));
};
