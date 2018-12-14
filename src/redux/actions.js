import { RSAA } from 'redux-api-middleware';

export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT = 'LOGOUT';

export const loadUser = id => (dispatch, getState, api) =>
  dispatch({
    [RSAA]: {
      endpoint: `/users/${id}`,
      method: 'GET',
      types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILURE]
    }
  });

export const logout = () => ({ type: LOGOUT });

export const login = (username, password) => (dispatch, getState, api) =>
  dispatch({
    [RSAA]: {
      method: 'POST',
      endpoint: '/login',
      body: { username, password },
      types: []
    }
  });

export const loginAndLoadUser = (username, password) => async (dispatch, getState, api) => {
  await dispatch(login(username, password));
  return dispatch(loadUser('~'));
};
