/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

export function makeImageRequest(method, data, api = '/image') {
  return request[method](api, data);
}

export function createImage(image) {
  return (dispatch, getState) => {
    const id = md5.hash("asdasd");
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const data = {
      count: 1,
      image
    };


  return makeImageRequest('post', data)
    .then(res => {
      if (res.status === 200) {
        return dispatch(createImageSuccess());
      }
    })
    .catch(() => {
      return dispatch(createImageFailure());
    });
  };
}

export function createImageSuccess() {
  return {
    type: types.CREATE_IMAGE_SUCCESS
  };
}

export function createImageFailure() {
  return {
    type: types.CREATE_IMAGE_FAILURE,
    /*
    id: data.id,
    error: data.error
    */
  };
}
