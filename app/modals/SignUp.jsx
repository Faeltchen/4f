import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import request from 'axios';
import {Modal, Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap';
import classNames from 'classnames/bind';

// bootstrap theme

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      validationStateEmail: null,
      validationStateUsername: null,
      validationStatePassword: null,
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
      email: ReactDOM.findDOMNode(this.refs.email).value,
      username: ReactDOM.findDOMNode(this.refs.username).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }
  }

  signup() {
    var obj = this;
    const { email, username, password } = this.getAuthParams()
    obj.props.auth.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      username,
      password,
    }, function(err) {
      if (err) {
        console.log("------Error---------");
        console.log(err);

        if(err.code == "email is required")
          obj.setState({validationStateEmail: "error"});
      }
    })
  }

  render() {
    const { auth } = this.props;

    return (
      <Modal ref="signup" show={this.state.showModal} onHide={this.close.bind(this)}>
        <Form onSubmit={this.signup.bind(this)}>
           <Modal.Header closeButton>
             <Modal.Title>Sign up</Modal.Title>
           </Modal.Header>
           <Modal.Body>
              <FormGroup controlId="email" validationState={this.state.validationStateEmail}>
                <ControlLabel>Email</ControlLabel>
                <FormControl type="text" ref="email" placeholder="E-Mail" required />
                
                {this.state.validationStateEmail == "error" ? <HelpBlock>Email is required.</HelpBlock> : null}
              </FormGroup>

              <FormGroup controlId="username">
                <ControlLabel>Username</ControlLabel>
                <FormControl type="text" ref="username" placeholder="Username" required />
              </FormGroup>

              <FormGroup controlId="password">
                <ControlLabel>Password</ControlLabel>
                <FormControl type="password" ref="password" placeholder="Password" required />
              </FormGroup>
           </Modal.Body>
           <Modal.Footer>
             <ButtonToolbar>
               <Button bsStyle="link" className="pull-left" >Rules</Button>
               <Button type="submit" bsStyle="primary" className="pull-right">Sign Up</Button>
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

export default connect(mapStateToProps, { })(SignUp);
