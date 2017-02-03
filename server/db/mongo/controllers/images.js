import _ from 'lodash';
import Image from '../models/images';

export function add(req, res) {
  Image.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}

export default {
  add
};
