import React  from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import FontAwesome from 'react-fontawesome';
import { loginAuthentification } from '../actions/users';

import Upload from '../modals/Upload';
import SignUp from '../modals/SignUp';
import Login from '../modals/Login';

import styles from '../scss/main';
import logo from '../images/logo.gif';

import { Navbar, Nav, NavDropdown, NavItem, MenuItem, Modal, Button} from 'react-bootstrap';
const cx = classNames.bind(styles);

class Navigation extends React.Component {

  render() {
    const auth = this.props.auth;

    var obj = this;

    return (
      <span ref="test">
        {typeof auth != "undefined" ?
          <Navbar className={cx("topbar")} inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                  { /* <a href="#"><img src={logo} alt="logo" height="60px"/></a> */ }
                  4fickr
                </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                {auth.loggedIn() ? <NavItem eventKey={1} href="#" onClick={function(){ obj.upload.open() }}><FontAwesome name='upload' />Upload</NavItem> : null}
                {auth.loggedIn() ? <Upload onRef={ref => (obj.upload = ref)}/>: null}

                {auth.loggedIn() ? <NavItem eventKey={2} href="#" onClick={function(){ obj.upload.open() }}><FontAwesome name='share' />Video</NavItem> : null}

                {!auth.loggedIn() ? <NavItem eventKey={3} href="#" onClick={function(){ obj.login.open() }}>Login</NavItem> : null}
                {!auth.loggedIn() ? <Login auth={auth} onRef={ref => (obj.login = ref)}/>: null}

                {!auth.loggedIn() ? <NavItem eventKey={4} href="#" onClick={function(){ obj.signup.open() }}>Sign Up</NavItem> : null}
                {!auth.loggedIn() ? <SignUp auth={auth} onRef={ref => (obj.signup = ref)}/>: null}
              </Nav>
              <Nav pullRight>
                {auth.loggedIn() ? <NavItem eventKey={1} href="#"><FontAwesome name='envelope' />Message (0)</NavItem> : null}
                {auth.loggedIn() ?
                  <NavDropdown eventKey={3} title="Notifications (0)" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                  </NavDropdown>
                : null}
                {auth.loggedIn() ? <NavItem eventKey={1} href="#"><FontAwesome name='cog'/>Settings</NavItem> : null}
                {auth.loggedIn() ? <NavItem eventKey={1} onClick={function(){ auth.logout(); obj.props.loginAuthentification(false); }} href="#"><FontAwesome name='sign-out' />Logout</NavItem> : null}
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

export default connect(mapStateToProps, { loginAuthentification })(Navigation);
