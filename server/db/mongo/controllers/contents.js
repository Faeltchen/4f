import _ from 'lodash';
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

  var q = Content.find({}).populate('image_id').sort({'date': -1}).limit(20);
  q.exec(function(err, content) {
     res.send(JSON.stringify(content, null, 3));
  });
}

export default {
  get
};
