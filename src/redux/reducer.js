import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const token = (state = null, { type, payload }) => {
  return state;
};

export default combineReducers({
  token,
  form
});
