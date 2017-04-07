import React  from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import classNames from 'classnames/bind';
import { loginAuthentification } from '../actions/users';
//import masonry from "masonry-layout";
import styles from '../scss/grid';

const cx = classNames.bind(styles);


class About extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const auth = this.props.auth;
    var obj = this;


    return (
      <div >

      </div>
    );
  }
};

function mapStateToProps(state) {

}

export default connect(mapStateToProps, { loginAuthentification })(About);
