import _ from 'lodash';
import { renderToString } from 'react-dom/server'
import Image from '../models/images';
import Content from '../models/content';
import User from '../models/user';
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";

//var _multiparty = require('multiparty');
//var _multiparty2 = _interopRequireDefault(_multiparty);
//var _fs2 = _interopRequireDefault(fs);
var multiparty = require('multiparty');
var util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

export function get(req, res, next) {
  var q = Content.find({}).populate('image_id').sort({'date': -1}).limit(50);
  q.exec(function(err, content) {

     res.send(JSON.stringify(content, null, 3));
  });
}

export function meta(req, res, next) {
  console.log("++++++++++++");
  console.log(req.params.id);

  var q = Content.find({"_id": req.query.id}).populate('image_id').sort({'date': 1}).limit(50);
  q.exec(function(err, content) {

     res.send(JSON.stringify(content, null, 3));
  });
}

export function test(req, res, next) {
  // Render the component to a string
  const html = renderToString(
    <div>
    testtest
    </div>
  )

  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState))
}


export default {
  get,
  meta,
  test
};
