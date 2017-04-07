import React from "react";
import classNames from 'classnames/bind';

import Navigation from '../containers/Navigation';
import Message from '../containers/Message';

//import "../css/main";
import styles from '../scss/main';
const cx = classNames.bind(styles);

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */

class App extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
      //var lock = new Auth0Lock(  'ADBPcMnmiCtR4gxu1B3H5GtEz9Ht9xtO', '4fickr.eu.auth0.com', {})
    return (
      <div className={cx("app")}>
        <Navigation auth={this.props.route.auth}/>
        <Message />

        {this.props.children}
      </div>
    );
  }
}

export default App;

/*
function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps, {  })(App);
*/
