import { isRSAA, RSAA } from 'redux-api-middleware';

export default store => next => action => {
  if (!isRSAA(action)) {
    return next(action);
  }

  const apiCall = action[RSAA];

  apiCall.headers = {
    ...apiCall.headers
  };

  return next(action);
};
