import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import jwtDecode from 'jwt-decode';

export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT = 'LOGOUT';

const auth = (state = {}, { type, payload }) => {
  switch (type) {
    case 'persist/REHYDRATE':
      const token = jwtDecode(payload.auth.token);
      const exp = token.exp;
      const d = new Date(0);
      d.setUTCSeconds(exp);

      return state;

    case LOGIN_USER_SUCCESS:
      // const { token } = payload;

      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};

export const getToken = state => state.auth.token;
export const getUser = state => state.auth.user;

export default persistReducer(
  {
    debug: true,
    key: 'blacksheep',
    whitelist: ['auth'],
    storage
  },
  combineReducers({
    auth,
    form
  })
);
