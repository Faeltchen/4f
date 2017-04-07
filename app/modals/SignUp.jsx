import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {Modal, Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar, HelpBlock} from 'react-bootstrap';
import classNames from 'classnames/bind';
import FontAwesome from 'react-fontawesome';
import { loginAuthentification } from '../actions/users';

var env = process.env.NODE_ENV || 'dev';

// bootstrap theme

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      validationStateEmail: null,
      validationEmailError: null,
      validationStateUsername: null,
      validationUsernameError: null,
      validationStatePassword: null,
      validationPasswordError: null,
      loading: false,
    };
  }


  componentDidMount() {
    this.props.onRef(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  getAuthParams() {
    return {
      email: ReactDOM.findDOMNode(this.refs.email).value,
      username: ReactDOM.findDOMNode(this.refs.username).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }
  }

  signup() {
    this.setState({loading: true});
    var obj = this;
    const { email, username, password } = this.getAuthParams()

    obj.props.auth.auth0.signup({
      connection: 'Username-Password-Authentication',
      email,
      username,
      password,
    }, function (err, res) {
        if (err) {
          if(env == "development") {
            console.error("--- SIGN UP Error ---");
            console.log(err);
          }

          obj.setState({
            validationStateEmail: null,
            validationEmailError: null,
            validationStateUsername: null,
            validationUsernameError: null,
            validationStatePassword: null,
            validationPasswordError: null,
            loading: false,
          });
          switch(err.code) {
            case "email is required":
            case "invalid email address":
              obj.setState({validationStateEmail: "error"});
              obj.setState({validationEmailError: err.description});
            break;
            case "password is required":
              obj.setState({validationStatePassword: "error"});
              obj.setState({validationPasswordError: err.description});
            break;
            user_exists
            case "username_exists":
              obj.setState({validationStateUsername: "error"});
              obj.setState({validationUsernameError: "The user already exists or the email is registered."});
            break;
            case "missing username for Username-Password-Authentication connection with requires_username enabled":
              obj.setState({validationStateUsername: "error"});
              obj.setState({validationUsernameError: "username is required"});
            break;
          }
        }
        else {
          var instance = axios.create({
            baseURL: 'http://h2548589.stratoserver.net:3000/api/',
            timeout: 1000,
          });
          instance.post('user', {
            auth0_id: res.Id,
            password: password,
            username: username,
            email: email
          })
          .then(function (response) {
            obj.props.loginAuthentification(true);
            obj.setState({ showModal: false, loading: false });
          })
          .catch(function (error) {
            obj.setState({ loading: false });
          });
        }
    });

  }

  render() {
    const { auth } = this.props;

    return (
      <Modal ref="signup" show={this.state.showModal} bsSize={"sm"} onHide={this.close.bind(this)}>
        <Form>
           <Modal.Header closeButton>
             <Modal.Title>Sign up</Modal.Title>
           </Modal.Header>
           <Modal.Body>
              <FormGroup controlId="email" validationState={this.state.validationStateEmail}>
                <FormControl.Feedback />
                <FormControl type="text" ref="email" placeholder="E-Mail" required />
                {this.state.validationStateEmail == "error" ? <HelpBlock>{this.state.validationEmailError}</HelpBlock> : null}
              </FormGroup>

              <FormGroup controlId="username" validationState={this.state.validationStateUsername}>
                <FormControl.Feedback />
                <FormControl type="text" ref="username" placeholder="Username" required />
                {this.state.validationStateUsername == "error" ? <HelpBlock>{this.state.validationUsernameError}</HelpBlock> : null}
              </FormGroup>

              <FormGroup controlId="password" validationState={this.state.validationStatePassword}>
                <FormControl.Feedback />
                <FormControl type="password" ref="password" placeholder="Password"  />
                {this.state.validationStatePassword == "error" ? <HelpBlock>{this.state.validationPasswordError}</HelpBlock> : null}
              </FormGroup>
              <a title="Rules">Rules</a>
              {this.state.loading ? <FontAwesome style={{float: "right"}} name='spinner' spin/> : null}
           </Modal.Body>
           <Modal.Footer>
             <ButtonToolbar>
               <Button block={true}  onClick={this.signup.bind(this)} bsStyle="primary" className="pull-right">Sign Up</Button>
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

export default connect(mapStateToProps, { loginAuthentification })(SignUp);
