import axios from 'axios';
import { createMemoryHistory, match } from 'react-router';
import createRoutes from './routes';
import configureStore from './store/configureStore';
import * as types from './types';
import preRenderMiddleware from './middlewares/preRenderMiddleware';
import { baseURL } from '../config/app';
import pageRenderer from './utils/pageRenderer';
import fs from "fs";
import jwt from "jsonwebtoken";


import Image from '../server/db/mongo/models/images';
import Content from '../server/db/mongo/models/content';
import Comment from '../server/db/mongo/models/comment';
import User from '../server/db/mongo/models/user';

// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = baseURL;

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export function render(req, res) {
  const authenticated = req.isAuthenticated();
  const history = createMemoryHistory();
  const store = configureStore({
    user: {
      authenticated,
      isWaiting: false,
      message: '',
      isLogin: true
    }
  }, history);
  const routes = createRoutes(store);

  /*
   * From the react-router docs:
   *
   * This function is to be used for server-side rendering. It matches a set of routes to
   * a location, without rendering, and calls a callback(err, redirect, props)
   * when it's done.
   *
   * The function will create a `history` for you, passing additional `options` to create it.
   * These options can include `basename` to control the base name for URLs, as well as the pair
   * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
   * You can also pass in an already instantiated `history` object, which can be constructured
   * however you like.
   *
   * The three arguments to the callback function you pass to `match` are:
   * - err:       A javascript Error object if an error occured, `undefined` otherwise.
   * - redirect:  A `Location` object if the route is a redirect, `undefined` otherwise
   * - props:     The props you should pass to the routing context if the route matched,
   *              `undefined` otherwise.
   * If all three parameters are `undefined`, this means that there was no route found matching the
   * given location.
   */

  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      // This method waits for all render component
      // promises to resolve before returning to browser
      // configure redux-auth BEFORE rendering the page

      store.dispatch({ type: types.CREATE_REQUEST });
      preRenderMiddleware(props)
      .then(data => {
        store.dispatch({ type: types.REQUEST_SUCCESS, data });
        const html = pageRenderer(store, props);
        res.status(200).send(html);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json(err);
      });

    } else {
      res.sendStatus(404);
    }
  });
}

export function renderContent(req, res) {
  //console.log(req.params.id)
  var q = Content.findOne({ '_id': req.params.id }).populate('image_id');
  q.exec(function(err, contentData) {
    var contentData = {content: contentData};

    var q = User.findOne({ '_id': contentData.content.user_id }).select('_id nickname');
    q.exec(function(err, userData) {
      userData = {user: userData};

      var q = Comment.find({ 'content_id': req.params.id });
      q.exec(function(err, commentData) {
        commentData = {comment: commentData};

        const authenticated = req.isAuthenticated();
        const history = createMemoryHistory();

        const store = configureStore({
          user: userData,
          content: contentData,
          comment: commentData,
        }, history);
        const routes = createRoutes(store);

        match({routes, location: req.url}, (err, redirect, props) => {

          if (err) {
            res.status(500).json(err);
          } else if (redirect) {
            res.redirect(302, redirect.pathname + redirect.search);
          } else if (props) {
            // This method waits for all render component
            // promises to resolve before returning to browser
            // configure redux-auth BEFORE rendering the page

            store.dispatch({ type: types.CREATE_REQUEST });
            preRenderMiddleware(props)
            .then(data => {
              store.dispatch({ type: types.REQUEST_SUCCESS, data });
              const html = pageRenderer(store, props);
              res.status(200).send(html);
            })
            .catch(err => {
              console.error(err);
              res.status(500).json(err);
            });

          } else {
            res.sendStatus(404);
          }
        });
      });
    });
  });
}
