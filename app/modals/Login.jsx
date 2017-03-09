import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import request from 'axios';
import {Modal, Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar, HelpBlock} from 'react-bootstrap';
import classNames from 'classnames/bind';

// bootstrap theme

import { createImage } from '../actions/images';

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
  /*
  login(e) {
    e.preventDefault()
    const { username, password } = this.getAuthParams()
    console.log(this.props.auth.login(username, password));
  }
  */
  setToken(accessToken, idToken) {
    // Saves user access token and ID token into local storage
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('id_token', idToken)
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
        console.log("-------------")
        console.log(err);

        if(err.code == "invalid_grant")
          obj.setState({validationState: "error"})

        return
      }
      if (authResult && authResult.idToken && authResult.accessToken) {
        obj.setToken(authResult.accessToken, authResult.idToken)
        browserHistory.replace('/home')
        obj.setState({validationState: "success"})
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
               <FormControl type="password" ref="password" placeholder="Password" required />
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

export default connect(mapStateToProps, { createImage })(Login);
