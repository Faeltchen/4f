import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';

import Upload from '../modals/Upload';
import Login from '../modals/Login';

import styles from '../css/components/navigation.css';


import { Navbar, Nav, NavDropdown, NavItem, MenuItem, Modal, Button} from 'react-bootstrap';
const cx = classNames.bind(styles);

class Navigation extends Component {

  componentDidMount() {
    console.log(this.child);
  }
  render() {
    var nav = this;



    return (
      <span ref="test">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {!this.props.user.authenticated ? <NavItem eventKey={1} href="#" onClick={function(){ nav.upload.open() }}>Upload</NavItem> : null}
              {!this.props.user.authenticated ? <Upload onRef={ref => (nav.upload = ref)}/>: null}

              {!this.props.user.authenticated ? <NavItem eventKey={2} href="#" onClick={function(){ nav.login.open() }}>Login</NavItem> : null}
              {!this.props.user.authenticated ? <Login onRef={ref => (nav.login = ref)}/>: null}

              <NavItem eventKey={2} href="#">Link</NavItem>
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
      </span>
    );
    /*
      return (
        <nav className={cx('navigation')} role="navigation">
          <Link
            to="/"
            className={cx('item', 'logo')}
            activeClassName={cx('active')}>Ninja Ocean</Link>
            { user.authenticated ? (
                <Link
                  onClick={logOut}
                  className={cx('item')} to="/">Upload</Link>
            ) : (
              <Button className={b("btn")} bsStyle="primary">Primary</Button>
            )}
          <Link className={cx('item')} to="/dashboard">Dashboard</Link>
          <Link to="/about" className={cx('item')} activeClassName={cx('active')}>About</Link>
        </nav>
      );
      */
    }
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
