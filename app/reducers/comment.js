import { combineReducers } from 'redux';
import * as types from '../types';

const comment = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.LOGIN_AUTHENTIFICATION:
      return !state;
    default:
      return state;
  }
};

const commentReducer = combineReducers({
  comment
});

export default commentReducer;
