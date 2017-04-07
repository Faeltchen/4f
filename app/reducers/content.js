import { combineReducers } from 'redux';
import * as types from '../types';

const content = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.CREATE_IMAGE_SUCCESS:
      return [...state];
    case types.CREATE_IMAGE_FAILURE:
      return [...state];
    default:
      return state;
  }
};


const contentReducer = combineReducers({
  content,
});

export default contentReducer;
