/**
 * Routes for express app
 */
 import express from 'express';
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';

import imagesUpload from 'images-upload-middleware';
import corsPrefetch from 'cors-prefetch-middleware';

import { controllers, passport as passportConfig } from '../db';
import multer from 'multer';
var upload = multer({ dest: 'uploads/' })

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const imageController = controllers && controllers.images;

export default (app) => {

  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }

  // topic routes
  if (imageController) {
    console.log(123);

    app.use('/uploads', express.static('./uploads'));
    app.use(corsPrefetch);
    app.post('/image', imagesUpload(
      './uploads',
      'http://localhost:3000/uploads',
      false,
      true
    ));





  //  app.post('/image', imageController.add);

    //app.post('/image', upload.single('avatar'), imageController.add)

  //  app.post('/image', upload.single('avatar'), imageController.add)
    /*
    http.post('/image', (res) => {
      const statusCode = res.statusCode;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error(`Request Failed.\n` +
                          `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\n` +
                          `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.log(error.message);
        // consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => rawData += chunk);
      res.on('end', () => {
        try {
          let parsedData = JSON.parse(rawData);
          console.log(parsedData);
        } catch (e) {
          console.log(e.message);
        }
      });
    }).on('error', (e) => {
      console.log(`Got error: ${e.message}`);
    });
    */
  } else {
    console.info(unsupportedMessage('topics routes'));
  }
};
