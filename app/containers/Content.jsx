import React  from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import classNames from 'classnames/bind';
import FontAwesome from 'react-fontawesome';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Form, Button, ButtonToolbar} from 'react-bootstrap';
import { loginAuthentification } from '../actions/users';
//import masonry from "masonry-layout";
import styles from '../scss/content';

const cx = classNames.bind(styles);

class ContentContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: this.props.comment,
      commentsLoading: false,
      addComment: false,
      addCommentLoading: false,
    }

    this.getComments = this.getComments.bind(this);
  }

  addComment(e) {
    e.preventDefault()

    var obj = this;
    obj.setState({addCommentLoading: true});
    var instance = axios.create({
      baseURL: '/',
      timeout: 1000,
      headers: {'id_token': localStorage.id_token}
    });
    instance.post('comment', {
      content_id: this.props.params.id,
      comment: ReactDOM.findDOMNode(this.refs.comment).value,
    }).then(function (response) {
      obj.getComments();
      obj.setState({addCommentLoading: false, addComment: false});
    });
  }

  getComments() {
    var obj = this;
    obj.setState({commentsLoading: true});
    var instance = axios.create({
      baseURL: '/',
      timeout: 1000,
      headers: {'id_token': localStorage.id_token}
    });
    instance.post('getComments', {
      content_id: this.props.params.id,
    }).then(function (response) {
      obj.setState({comments: response.data, commentsLoading: false});
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

    var commentsDOM = [];
    var comments = this.state.comments;
    Object.keys(comments).forEach(function(key) {
      var date = new Date(comments[key].date).toLocaleString('de-DE');

      commentsDOM.push(
        <Row className="show-grid" key={"comment_"+key}>
          <Col lg={6} md={6} lgOffset={3} mdOffset={3}>
            <div className={cx("comment")}>
              <div><span className={cx("comment_author")}>{comments[key].user_id.nickname}</span> <span className={cx("comment_date")}>{date}</span></div>
              <p>{comments[key].comment}</p>
            </div>
          </Col>
        </Row>
      );
    });

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
              <div>
                {obj.state.addComment ?
                  <Row className="show-grid" >
                    <Col lg={6} md={6} lgOffset={3} mdOffset={3}>
                      <div className={cx("add_comment")}>
                        <Form>
                          <FormGroup controlId="formControlsTextarea" style={{margin: "0 0 5px 0"}}>
                            <FormControl ref={"comment"} componentClass="textarea" placeholder="Your comment..." style={{ height: 100}}/>
                          </FormGroup>
                          <ButtonToolbar>
                            <div style={{textAlign: "right"}}>
                              {this.state.addCommentLoading ? <FontAwesome style={{ margin: "8px 20px 0 0"}} name='spinner' spin/> : null}
                              <Button bsSize={"sm"} onClick={this.addComment.bind(this)} bsStyle="primary" className="pull-right">
                                Submit
                              </Button>
                            </div>
                          </ButtonToolbar>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                :
                  <Row className="show-grid" >
                    <Col lg={4} md={4} lgOffset={4} mdOffset={4}>
                      <div className={cx("add_comment")}>
                        <a onClick={function(){ obj.setState({addComment: true});}} style={{display: "inline-block", padding: "5px 10px"}}><FontAwesome name='plus'/> Add comment</a>
                      </div>
                    </Col>
                  </Row>
                }
              </div>
             : null}
          </div>
          {this.state.commentsLoading ?
              <FontAwesome style={{ margin: "8px 20px 0 0"}} size="2x" name='spinner' spin/>
            :
            <div>
              {commentsDOM}
            </div>
          }

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
