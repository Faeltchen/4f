import User from '../models/user';
var {ObjectId} = require('mongodb'); // or ObjectID

export default (id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
};
