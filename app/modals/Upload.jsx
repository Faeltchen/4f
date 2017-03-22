import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import request from 'axios';

//import ImagesUploader from 'react-images-uploader';
//import 'react-images-uploader/styles.css';
import FileUpload from "react-fileupload";
import {Modal, Button} from 'react-bootstrap';
import classNames from 'classnames/bind';

import { createImage } from '../actions/images';

class Upload extends Component {

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
    var options = {
      baseUrl:'http://h2548589.stratoserver.net:3000/image',
      requestHeaders: {'id_token': localStorage.id_token},
      accept: 'image/*',
    }

    return (
      <Modal ref="upload" show={this.state.showModal} onHide={this.close.bind(this)}>
         <Modal.Header closeButton>
           <Modal.Title>Upload</Modal.Title>
         </Modal.Header>
         <Modal.Body>
       { /*
           <ImagesUploader
               url="http://h2548589.stratoserver.net:3000/image"
               multiple={false}
               optimisticPreviews={false}
               onLoadEnd={(err) => {
                  if (err) {
                    console.log("-->" + err);
                  }
                  else {
                  //  this.setState({ showModal: false });
                  }
                }}
             />
              */ }

          <FileUpload options={options} ref="File-Upload">
            <h3>Please choose</h3>
            <div ref="chooseBtn">
                <i className="icon icon-upload" />
                <span>do it</span>
            </div>
            <p>You have uploaded {this.state.rate}</p>
            <button ref="uploadBtn">upload</button>
            <p>Thanks for using</p>
          </FileUpload>
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

export default connect(mapStateToProps, { createImage })(Upload);
