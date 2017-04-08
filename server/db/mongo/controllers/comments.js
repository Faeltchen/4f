import _ from 'lodash';
import { renderToString } from 'react-dom/server'
//import Image from '../models/images';
import User from '../models/user';
import Comment from '../models/comment';
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";

var multiparty = require('multiparty');
var util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

export function add(req, res, next) {

  var cert = fs.readFileSync('4fickr.pem');  // get public key

  jwt.verify(req.get("id_token"), cert, function(err, decoded) {


    var query = User.findOne({ 'auth0_id': decoded.sub.split("|")[1] });
    // selecting the `name` and `occupation` fields
    query.select('_id');
    // execute the query at a later time
    query.exec(function (err, user) {
      Comment.create({
        user_id: user._id,
        content_id: req.body.content_id,
        comment: req.body.comment,
        }, (err, image) => {
          if (!err)
            res.status(200).json({ });
          else
            res.status(400).json({ });
        }
      );
    });
  });
}

export function get(req, res, next) {

  var q = Comment.find({"content_id": req.body.content_id}).populate('user_id').sort({'date': 1});
  q.exec(function(err, comments) {
    res.send(JSON.stringify(comments, null, 3));
  });
}

export default {
  add,
  get,
};
