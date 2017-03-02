import _ from 'lodash';
import Image from '../models/images';
import path from "path";
import fs from "fs";

export function add(req, res) {
  console.log("BACKEND")
  console.log(req);

  return res.status(200).send("ok");
}

export default {
  add
};
