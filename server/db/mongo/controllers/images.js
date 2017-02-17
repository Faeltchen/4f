import _ from 'lodash';
import Image from '../models/images';
import path from "path";
import fs from "fs";

export function add(req, res) {
  console.log("BACKEND")
  console.log(req.body.path);

  var newPath = "./uploads/test.png";

  fs.writeFile('./uploads/outputImage.png', req.body, 'binary', function (err) {
      if (err) {
          console.log("There was an error writing the image")
      }

      else {
          console.log("There file was written")
      }
  });

  //var blob = new Blob([array], {type: "image/png"});
  /*
  var buf = new Buffer(req.body.image.preview, "binary");
  require("fs").writeFile("./uploads/test.png", buf, 'base64', function(err) {
    console.log(err);
  });
*/
  //var buf = new Buffer(req.body.image.preview, {type: "image/png"}); // decode
  /*
  fs.writeFile("./uploads/test.png", buf, function(err) {
    console.log("READY")
    if(err) {
      console.log("err", err);
    }
  })
  var base64Data = req.rawBody.replace(/^data:image\/png;base64,/, "");

  fs.writeFile("out.png", base64Data, 'base64', function(err) {
    console.log(err);
  });
  fs.writeFile("./uploads/test.txt", "testtest", function(err) {

    if(err) {
      console.log("err", err);
    }
  })

  if (path.extname(req.body.image.name).toLowerCase() === '.png') {
      fs.rename(tempPath, targetPath, function(err) {
          //if (err) throw err;
          console.log("Upload completed!");
      });
  } else {
      fs.unlink(tempPath, function () {
          //if (err) throw err;
          console.error("Only .png files are allowed!");
      });
  }
  */


  /*
  acceptedFiles.forEach((file)=> {
      req.attach(file.name, file);
  });
  req.end(callback);

  Image.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
  */
  return res.status(200).send("ok");
}

export default {
  add
};
