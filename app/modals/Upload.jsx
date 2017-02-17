import React, { Component, PropTypes } from 'react';
import request from "request";
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import {Modal, Button} from 'react-bootstrap';
import classNames from 'classnames/bind';

import { createImage } from '../actions/images';

class Upload extends Component {

  constructor(props) {
    super(props);

    this.state = {showModal: true, files: []};
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

  onDrop(acceptedFiles) {
    console.log("--------------")
    /*
    this.setState({
      files: acceptedFiles
    });
    */

    var req = request.post('/image/', function(){console.log("test")});

    acceptedFiles.forEach((file)=> {
      console.log(file.name)
      //  req.attach(file.name, file);
    });
    /*
    request.post({
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      url:     'http://localhost/test2.php',
      body:    "mes=heydude"
    }, function(error, response, body){
      console.log(body);
    });
    */
    req.end(callback);

    /*
    acceptedFiles.forEach((image)=> {
      console.log(image);
      this.props.createImage(image);
    });
*/
    /*
    this.setState({
      files: acceptedFiles
    });
    */
    /*
    var req = request.post('/upload');
    acceptedFiles.forEach((file)=> {
        req.attach(file.name, file);
    });
    req.end(callback);
    */
  }

  onOpenClick() {
    this.dropzone.open();
  }

  render() {
    return (
      <Modal ref="upload" show={this.state.showModal} onHide={this.close.bind(this)}>
         <Modal.Header closeButton>
           <Modal.Title>Modal heading</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Dropzone disablePreview={true} ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop.bind(this)}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            <button type="button" onClick={this.onOpenClick}>
              Open Dropzone
            </button>

            {this.state.files.length > 0 ? <div>
            <h2>Uploading {this.state.files.length} files...</h2>

            </div> : null}

           <h4>Overflowing text to show scroll behavior</h4>
           <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
           <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
           <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
           <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
           <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
           <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
           <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
           <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
           <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={this.close}>Close</Button>
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
