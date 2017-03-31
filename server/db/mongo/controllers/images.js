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

export function add(req, res, next) {

  /*
  jwt.verify(req.get("id_token"), "tR-nhJmQwnZALTVuGMNmg97OCY2maiuWFpYlZ9EwauHonL3aQuQgud513ZdGTtrV", { algorithms: ['HS256'] }, function(err, decoded) {
    console.log(decoded) // bar
  });
  */
  // invalid token - synchronous

  var cert = fs.readFileSync('4fickr.pem');  // get public key

  jwt.verify(req.get("id_token"), cert, function(err, decoded) {
    if(decoded) {
      var query = User.findOne({ 'auth0_id': decoded.sub.split("|")[1] });
      // selecting the `name` and `occupation` fields
      query.select('_id');

      // execute the query at a later time
      query.exec(function (err, user) {
        if (err) return handleError(err);

        var path = "./uploads/"+user._id;

        if (!fs.existsSync(path)) fs.mkdirSync(path);

        var form = new multiparty.Form({uploadDir: path, maxFields: 1});
        //destination: path + "/" + file.path.split("/")[2].replace(/\.[^/.]+$/, "") + "_200px." + file.path.split("/")[2].split('.').pop(),
        form.parse(req, function(err, fields, files) {
          res.writeHead(200, {'content-type': 'text/plain'});
          res.write('received upload:\n\n');
          res.end(util.inspect({fields: fields, files: files}));

          Object.keys(files).forEach(function(key, index) {
            var file = this[key][0];


            Image.create({
              user_id: user._id,
              originalFilename: file.originalFilename,
              genericFilename: file.path.split("/")[2],
              }, (err, image) => {
                if (!err) {
                  Content.create({
                    user_id: user._id,
                    image_id: image._id,
                    }, (err) => {
                      if (!err) {
                        var fs = require('fs')
                          , gm = require('gm');

                        // resize and remove EXIF profile data
                        gm(path + "/" + file.path.split("/")[2])
                        .resize(240, 240)
                        .noProfile()
                        .write(path + "/" + file.path.split("/")[2].replace(/\.[^/.]+$/, "") + "_200px." + file.path.split("/")[2].split('.').pop(), function (err) {
                          if (!err) console.log('done');
                          else console.log(err);
                        });
                      }
                    }
                  );
                }
              }
            );
          }, files);
        });
      })
    }

    if(err)
      console.log(err);
  });
}

export default {
  add
};
