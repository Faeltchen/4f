import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import request from 'axios';
import {Modal, Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar, HelpBlock} from 'react-bootstrap';
import classNames from 'classnames/bind';

// bootstrap theme

import { loginAuthentification } from '../actions/users';

var env = process.env.NODE_ENV || 'dev';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      validationState: null,
    };
  }


  componentDidMount() {
    this.props.onRef(this)
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  getAuthParams() {
    return {
      username: ReactDOM.findDOMNode(this.refs.username).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }
  }

  login(e) {
    e.preventDefault()
    var obj = this;
    const { username, password } = this.getAuthParams()

    obj.props.auth.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password
    }, (err, authResult) => {
      if (err) {
        if(env == "development") {
          console.error("--- LOGIN ERROR ---")
          console.log(err);
        }

        obj.setState({validationState: "error"})

        return
      }

      if (authResult && authResult.idToken && authResult.accessToken) {
        localStorage.setItem('access_token', authResult.accessToken)
        localStorage.setItem('id_token', authResult.idToken)
        obj.setState({validationState: "success"})
        obj.props.loginAuthentification(true);
        //location.reload()
      }
    })
  }

  render() {
    const { auth } = this.props;

    return (
      <Modal ref="login" show={this.state.showModal} onHide={this.close.bind(this)}>
        <Form onSubmit={this.login.bind(this)}>
           <Modal.Header closeButton>
             <Modal.Title>Login</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <FormGroup validationState={this.state.validationState} controlId="username">
               <ControlLabel>Username</ControlLabel>
               <FormControl type="text" ref="username" placeholder="Username" required />
             </FormGroup>

             <FormGroup validationState={this.state.validationState}  controlId="password" >
               <ControlLabel>Password</ControlLabel>
               <FormControl type="password" ref="password" placeholder="Password"  />
               <FormControl.Feedback />
               {this.state.validationState == "error" ? <HelpBlock>Incorrect email or password.</HelpBlock> : null}
             </FormGroup>
           </Modal.Body>
           <Modal.Footer>
             <ButtonToolbar>
               <Button type="submit" bsStyle="primary" className="pull-right">Log In</Button>
             </ButtonToolbar>
           </Modal.Footer>
         </Form>
       </Modal>
    );
  }
};

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps, { loginAuthentification })(Login);
