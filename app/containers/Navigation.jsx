import React  from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';

import Upload from '../modals/Upload';
import SignUp from '../modals/SignUp';
import Login from '../modals/Login';

import styles from '../css/components/navigation.css';


import { Navbar, Nav, NavDropdown, NavItem, MenuItem, Modal, Button} from 'react-bootstrap';
const cx = classNames.bind(styles);

class Navigation extends React.Component {

  render() {
    const auth = this.props.auth;

    var nav = this;

    return (
      <span ref="test">
        {typeof auth != "undefined" ?
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                  <a href="#">4fickr</a>
                </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                {auth.loggedIn() ? <NavItem eventKey={1} href="#" onClick={function(){ nav.upload.open() }}>Upload</NavItem> : null}
                {auth.loggedIn() ? <Upload onRef={ref => (nav.upload = ref)}/>: null}

                {!auth.loggedIn() ? <NavItem eventKey={2} href="#" onClick={function(){ nav.login.open() }}>Login</NavItem> : null}
                {!auth.loggedIn() ? <Login auth={auth} onRef={ref => (nav.login = ref)}/>: null}

                {!auth.loggedIn() ? <NavItem eventKey={3} href="#" onClick={function(){ nav.signup.open() }}>Sign Up</NavItem> : null}
                {!auth.loggedIn() ? <SignUp auth={auth} onRef={ref => (nav.signup = ref)}/>: null}

                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">Link Right</NavItem>
                <NavItem eventKey={2} href="#">Link Right</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        : null}
      </span>
    );
  }
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
