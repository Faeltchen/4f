import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Content, Grid} from './pages';
/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
 /* <Route path="/content/:id" component={Content}  /> */
export default (store, auth) => {
  return (
    <Route path="/" component={App} auth={auth}>
      <IndexRoute component={Grid} />
      <Route path="/content/:id" component={Content} auth={auth}/>
    </Route>
  );

  /*
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Vote} fetchData={fetchVoteData} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="about" component={About} />
    </Route>
  );
  */
};
