import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import request from 'axios';
import {Modal, Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar, HelpBlock} from 'react-bootstrap';
import classNames from 'classnames/bind';
import FontAwesome from 'react-fontawesome';
import { loginAuthentification } from '../actions/users';

import styles from '../scss/main';
const cx = classNames.bind(styles);

var env = process.env.NODE_ENV || 'dev';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      resetPassword: false,
      validationState: null,
      successPasswordReset: null,
      loading: false
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
    this.setState({loading: true});
    e.preventDefault()
    var obj = this;
    const { username, password } = this.getAuthParams()

    obj.props.auth.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password
    }, (err, authResult) => {
      obj.setState({loading: false});
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
      }
    })
  }

  resetPassword(e) {
    this.setState({loading: true});
    e.preventDefault()
    var obj = this;

    request.post('https://4fickr.eu.auth0.com/dbconnections/change_password', {
      client_id: 'ADBPcMnmiCtR4gxu1B3H5GtEz9Ht9xtO',
      email: ReactDOM.findDOMNode(this.refs.email).value,
      connection: 'Username-Password-Authentication'
    })
    .then(function (response) {
      obj.setState({resetPassword: false});
      obj.setState({successPasswordReset: true})
      obj.setState({loading: false});
    });
  }

  render() {
    var obj = this;
    const { auth } = this.props;

    return (
      <Modal ref="login" show={this.state.showModal} bsSize={"sm"} onHide={this.close.bind(this)}>
        {this.state.resetPassword ?
          <Form onSubmit={this.resetPassword.bind(this)}>
            <Modal.Header closeButton>
             <Modal.Title>Password Reset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Enter your email adress. We will send you an email to reset your password.</p>
             <FormGroup validationState={this.state.validationStateResetPassword} controlId="email">
               <FormControl type="email" ref="email" placeholder="Email" required />
               {this.state.validationStateResetPassword == "error" ? <HelpBlock>This email address does not exist</HelpBlock> : null}
             </FormGroup>
             <a onClick={ function(){obj.setState({resetPassword: false});} } title="Back to login">Back to login</a>
             {this.state.loading ? <FontAwesome style={{float: "right"}} name='spinner' spin/> : null}
            </Modal.Body>
            <Modal.Footer>
             <ButtonToolbar>
               <Button type="submit" bsStyle="primary" block={true} className="pull-right">Submit</Button>
             </ButtonToolbar>
            </Modal.Footer>
          </Form>
        :
          <Form onSubmit={this.login.bind(this)}>
            <Modal.Header closeButton>
             <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.successPasswordReset ?
                <p>We have just sent you an email to reset your password.</p>
              : null}
             <FormGroup validationState={this.state.validationState} controlId="username">
               <FormControl type="text" ref="username" placeholder="Username" required />
             </FormGroup>

             <FormGroup validationState={this.state.validationState}  controlId="password" >
               <FormControl type="password" ref="password" placeholder="Password"  />
               <FormControl.Feedback />
               {this.state.validationState == "error" ? <HelpBlock>Incorrect email or password.</HelpBlock> : null}
             </FormGroup>

             <a onClick={ function(){obj.setState({resetPassword: true});} } title="Reset Password">Forgot your password?</a>
             {this.state.loading ? <FontAwesome style={{float: "right"}} name='spinner' spin/> : null}
            </Modal.Body>
            <Modal.Footer>
             <ButtonToolbar>
               <Button type="submit" bsStyle="primary" block={true} className="pull-right">Log In</Button>
             </ButtonToolbar>
            </Modal.Footer>
          </Form>
        }
       </Modal>
    );
  }
};

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps, { loginAuthentification })(Login);
