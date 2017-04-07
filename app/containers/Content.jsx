import React  from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import classNames from 'classnames/bind';
import FontAwesome from 'react-fontawesome';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Form, Button} from 'react-bootstrap';
import { loginAuthentification } from '../actions/users';
//import masonry from "masonry-layout";
import styles from '../scss/content';

const cx = classNames.bind(styles);

class ContentContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      addComment: false,
    }

    //this.createDOM = this.createDOM.bind(this);
  }

  addComment(e) {
    e.preventDefault()

    var obj = this;
    var instance = axios.create({
      baseURL: '/',
      timeout: 1000,
      headers: {'id_token': localStorage.id_token}
    });
    instance.post('comment', {
      content_id: this.props.params.id,
      comment: ReactDOM.findDOMNode(this.refs.comment).value,
    }).then(function (response) {

    });
  }

  render() {
    var obj = this;
    var content;

    var auth = this.props.route.auth;

    if(typeof this.props.content.image_id == "object")
      content = (
        <img src={"/uploads/"+this.props.content.user_id+"/"+this.props.content.image_id.genericFilename} alt={this.props.content.image_id.originalFilename} />
      );

    console.log(this.props.comment);

    return (
      <div className={cx("content")}>
        {content}
        <Grid>
          <Row className="show-grid">
            <Col lg={8} md={8} lgOffset={2} mdOffset={2}>
              <div className={cx("user_info")}>
                <Row className="show-grid">
                  <Col lg={2} md={2} >
                    <div className={cx("placeholder")}></div>
                  </Col>
                  <Col lg={10} md={10} style={{paddingLeft: 0}}>
                    <div className={cx("user_name")}>
                      <a title="Administrator"><FontAwesome name='star'/></a>
                      <span>{this.props.user.nickname}</span>
                    </div>
                    <div className={cx("user_stats")}>
                      <div title="Uploaded images"><FontAwesome name='picture-o'/>Images</div>
                      <div title="Shared content"><FontAwesome name='share'/>Shared</div>
                      <div title="Uploaded webm"><FontAwesome name='film'/>WebM</div>
                    </div>
                    <div className={cx("user_action")}>
                      <a href={"javascript: void();"} title="Follow user">Follow user</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href={"javascript: void();"} title="Abuse user">Abuse user</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <div ref="click">
            {typeof auth != "undefined" && auth.loggedIn() ?
              <div className={cx("add_comment")}>
                {obj.state.addComment ?
                  <Form>
                    <FormGroup controlId="formControlsTextarea" style={{margin: "0 0 5px 0"}}>
                      <FormControl ref={"comment"} componentClass="textarea" placeholder="Your comment..." style={{width: 400, height: 140}}/>
                    </FormGroup>
                    <Button bsSize={"sm"} onClick={this.addComment.bind(this)} bsStyle="primary" className="pull-right">
                      Submit
                    </Button>
                  </Form>
                :
                  <a onClick={function(){ obj.setState({addComment: true}); }} style={{display: "inline-block", padding: "5px 10px"}}><FontAwesome name='plus'/> Add comment</a>
                }
              </div>
             : null}
          </div>
        </Grid>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    content: state.content.content,
    comment: state.comment.comment,
    user: state.user.user
  };
}

export default connect(mapStateToProps, {  })(ContentContainer);
