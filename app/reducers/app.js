import { combineReducers } from 'redux';
import * as types from '../types';

const image = (
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


const imageReducer = combineReducers({
  image,
});

export default imageReducer;
