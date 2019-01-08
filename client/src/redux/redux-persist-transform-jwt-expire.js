import reduxPersist from 'redux-persist';

const inbound = state => {
  if (!state) return state;
};

const outbound = state => {};

export default reduxPersist.createTransform(inbound, outbound);
