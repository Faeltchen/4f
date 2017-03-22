import _ from 'lodash';
import Image from '../models/images';
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
      console.log(decoded); // bar

      var form = new multiparty.Form({uploadDir: "./uploads"});

      form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
      });


      /*
      Image.create({
        originalFilename: originalFilename,
        genericFilename: fileName,
        }, (err) => {
          if (err) {
            console.log('Error on upload!');
          }
        }
      );
      */
    }

    if(err)
      console.log(err);
  });

  /*
  var savePath = './uploads';
  var servePath = 'http://localhost:3000/uploads';

  var localSavePath = savePath.charAt(savePath.length - 1) === '/' ? savePath.slice(0, -1) : savePath;
  var localServePath = servePath.charAt(servePath.length - 1) === '/' ? servePath.slice(0, -1) : servePath;

  var form = new _multiparty2.default.Form();
  form.parse(req, function (err, fields, files) {
    if (err) {
      sendError(res, err);
      return;
    }
    if (files.imageFiles && files.imageFiles.length > 0) {
        var _files$imageFiles$ = files.imageFiles[0],
            tempPath = _files$imageFiles$.path,
            originalFilename = _files$imageFiles$.originalFilename;

        var fileName = originalFilename;

        var fileExtNum = fileName.lastIndexOf('.');
        var fileExt = fileExtNum < 0 ? '' : fileName.substr(fileExtNum);
        fileName = '' + Math.floor(Date.now()) + fileExt;

        var _saveFile2 = saveFile(tempPath, localSavePath, localServePath, fileName),
            _error = _saveFile2.error,
            _path = _saveFile2.path;

        if (_error) {
          sendError(res, _error);
          return;
        }

        Image.create({
          originalFilename: originalFilename,
          genericFilename: fileName,
          }, (err) => {
            if (err) {
              console.log('Error on upload!');
            }
          }
        );

        res.send(JSON.stringify(_path));
    } else {
      res.sendStatus(400);
    }
  });
  */
}

function sendError(res, error) {
	var err = new Error(error);
	res.sendStatus(400);
}

function saveFile(tempPath, savePath, servePath, fileName) {
	var copyToPath = savePath + '/' + fileName;
	try {
		if (!_fs2.default.existsSync(copyToPath)) {
			var data = _fs2.default.readFileSync(tempPath);
			// make copy of image to new location
			_fs2.default.writeFileSync(copyToPath, data);
			// delete temp image
			_fs2.default.unlinkSync(tempPath);
		}
		return {
			error: false,
			path: servePath + '/' + fileName
		};
	} catch (e) {
		return {
			error: e
		};
	}
}

export default {
  add
};
