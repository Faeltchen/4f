import React  from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import classNames from 'classnames/bind';
import { loginAuthentification } from '../actions/users';
//import masonry from "masonry-layout";
import styles from '../scss/grid';

import "../../node_modules/react-grid-layout/css/styles.css";
//import { Navbar, Nav, NavDropdown, NavItem, MenuItem, Modal, Button} from 'react-bootstrap';
const cx = classNames.bind(styles);


class Grid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      content: null,
      contentDOM: null
    }

    this.createDOM = this.createDOM.bind(this);
    this.getContent();
  }

  createDOM(content) {
    var obj = this;
    var DOM = [];
    var Image;

    Object.keys(content).forEach(function(key) {
      console.log(content[key])

      DOM.push(
        <a href={"/content_"+content[key]._id} className={cx("brick")} key={"c_"+key} >
          <img src={"uploads/"+content[key].user_id+"/"+content[key].image_id.genericFilename} alt="" />
        </a>
      );
    });

    /*
    {objects.map(function(content, key){
      return <div key={"c_"+key} >{key}</div>
    })}
    */

    obj.setState({contentDOM: DOM});
  }

  getContent() {
    console.log("---------- GET CONTENT ----------");
    var obj = this;
    var instance = axios.create({
      baseURL: '/',
      timeout: 1000,
    });
    instance.get('content').then(function (response) {
      obj.createDOM(response.data);

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const auth = this.props.auth;
    var obj = this;

    var layoutLg = [
        {i: 'c_0', x: 0, y: 0, w: 3, h: 4, static: true},
        {i: 'c_1', x: 3, y: 0, w: 2, h: 2},
        {i: 'c_2', x: 5, y: 0, w: 1, h: 1},
        {i: 'c_3', x: 6, y: 0, w: 1, h: 1},
        {i: 'c_4', x: 7, y: 0, w: 1, h: 1},
        {i: 'c_5', x: 8, y: 0, w: 1, h: 1},
        {i: 'c_6', x: 9, y: 0, w: 1, h: 1},
        {i: 'c_7', x: 10, y: 0, w: 2, h: 3},
        {i: 'c_8', x: 3, y: 3, w: 1, h: 1},
        {i: 'c_9', x: 4, y: 3, w: 1, h: 1},
        {i: 'c_10', x: 5, y: 3, w: 2, h: 3},
        {i: 'c_11', x: 7, y: 3, w: 1, h: 1},
    ];

    /*
    <ResponsiveReactGridLayout
      className="brick"
      layout={layout}
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
      width={window.innerWidth}
      rowHeight={50}
      margin={[0, 0]}
      isDraggable={false}
      isResizable={false}
    >
    */

    return (
      <div className={cx("grid")} ref={(div) => { this.grid = div; }} onClick={this.getContent.bind(this)}>
        {this.state.contentDOM != null ?
          <ResponsiveReactGridLayout
            className="brick"
            layouts={{lg: layoutLg}}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            rowHeight={60}
            margin={[0, 0]}
            isDraggable={false}
            isResizable={false}
          >
            {this.state.contentDOM}

          </ResponsiveReactGridLayout>
        : null}



      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { loginAuthentification })(Grid);
