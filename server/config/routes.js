/**
 * Routes for express app
 */
 import express from 'express';
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';

import corsPrefetch from 'cors-prefetch-middleware';

import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const imageController = controllers && controllers.images;
const contentController = controllers && controllers.contents;

export default (app) => {

  // user routes
  if (usersController) {
    app.post('/api/user', usersController.create);

    /*
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
    */
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
  console.log(__dirname + '/../uploads');
  //app.use(express.static(__dirname + '/../uploads'));
  app.use('/uploads',express.static(__dirname + '/../uploads'));

  // topic routes
  if (imageController) {
    //app.use('/uploads', express.static('./uploads'));
    //app.use(corsPrefetch);
    app.post('/image', imageController.add);
  }

  if (contentController) {
    //app.use('/uploads', express.static('./uploads'));
    //app.use(corsPrefetch);
    app.get('/content', contentController.get);
  }
};
