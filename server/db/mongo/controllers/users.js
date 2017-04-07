import passport from 'passport';
import User from '../models/user';
import fs from "fs";
import jwt from "jsonwebtoken";

export function create(req, res, next) {
  console.log(req.body)

  var bcrypt = require('react-native-bcrypt');
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  console.log(req.body);
  const user = new User({
    auth0_id: req.body.auth0_id,
    nickname: req.body.username,
    email: req.body.email,
    password: hash
  });

  User.findOne({ email: req.body.email }, (findErr, existingUser) => {
    if (existingUser) {
      return res.status(409).json({ message: 'Account with this email address already exists!' });
    }

    return user.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return res.status(200).json({
        message: 'You have been successfully logged in.'
      });
    });
  });
}

export default {
  create
};
