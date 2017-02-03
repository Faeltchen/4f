/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

function makeImageRequest(method, api = '/image') {
  return request[method](api);
}

export function test() {

    return makeImageRequest('post')
      .then(res => {
        if (res.status === 200) {

        }
      })
      .catch(() => {

      });
  
}
