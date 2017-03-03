import _ from 'lodash';
import Image from '../models/images';
import path from "path";
import fs from "fs";

var _multiparty = require('multiparty');
var _multiparty2 = _interopRequireDefault(_multiparty);
var _fs2 = _interopRequireDefault(fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


export function add(req, res, next) {
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
}

function sendError(res, error) {
	var err = new Error(error);
	console.error(err);
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
