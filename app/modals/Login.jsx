import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import request from 'axios';

import {Modal, Button} from 'react-bootstrap';
import classNames from 'classnames/bind';

import { createImage } from '../actions/images';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {showModal: false};
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

  render() {
    return (
      <Modal ref="login" show={this.state.showModal} onHide={this.close.bind(this)}>
         <Modal.Header closeButton>
           <Modal.Title>Login</Modal.Title>
         </Modal.Header>
         <Modal.Body>

         </Modal.Body>
         <Modal.Footer>
           <Button onClick={this.close.bind(this)}>Close</Button>
         </Modal.Footer>
       </Modal>
    );
  }
};

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps, { createImage })(Login);
