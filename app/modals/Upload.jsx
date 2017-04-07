import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import request from 'axios';
import FileUpload from "react-fileupload";
import FontAwesome from 'react-fontawesome';
import {Modal, Button, ButtonToolbar, ProgressBar, HelpBlock} from 'react-bootstrap';
import classNames from 'classnames/bind';

import { createImage } from '../actions/images';

import styles from '../scss/main';
const cx = classNames.bind(styles);

class Upload extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      filename: "",
      progress: 0,
      loaded: 0,
      total: 0,
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

  render() {
    var obj = this;

    var options = {
      baseUrl:'http://h2548589.stratoserver.net:3000/image',
      requestHeaders: {'id_token': localStorage.id_token},
      dataType: 'text',
      wrapperDisplay : 'inline-block',
      accept: 'image/*',
      chooseFile : function(files){
        obj.setState({
          filename: (typeof files == 'string' ? files : files[0].name),
          total: files[0].size
        });
      },
      uploading : function(progress){
        obj.setState({
          progress: Math.round((progress.loaded/progress.total)*100),
          total: progress.total,
        });
      },
      uploadSuccess : function(resp){
        obj.setState({
          showModal: false,
          filename: "",
          progress: 0,
          loaded: 0,
          total: 0,
        });
      },
      uploadError : function(err){
        console.log(err)
      },
      uploadFail : function(resp){
        console.log(resp)
      },
    }

    return (
      <Modal ref="upload" show={this.state.showModal} bsSize={"sm"} onHide={this.close.bind(this)}>
         <Modal.Header closeButton>
           <Modal.Title><FontAwesome name='upload' /> Upload</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <p>File extensions types that are supplied and accepted are: jpg, jpeg, png, gif, webm, mp4</p>
          <div className={cx("upload-form")}>
            <FileUpload options={options} ref="File-Upload">
              <div ref="chooseBtn" >
                <Button block={true} type="submit" bsStyle="primary" block={true} className="pull-right">Select</Button>
              </div>
              <div ref="uploadBtn" >
                <Button block={true} type="submit" disabled={this.state.filename == "" ? true : null} bsStyle="primary" block={true} className="pull-right">Upload</Button>
              </div>
            </FileUpload>
          </div>
          <ProgressBar style={{marginBottom: "5px"}} active now={this.state.progress} label={`${this.state.progress}%`} />
          <HelpBlock>{this.state.filename}</HelpBlock>
          <HelpBlock style={{float:"right"}}>{Math.round(this.state.total / 1024)} KB</HelpBlock>
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
