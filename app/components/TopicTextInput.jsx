import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { test } from '../actions/images';

const ENTER_KEY_CODE = 13;

class TopicTextInput extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  /*
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways. I personally think this makes it more reusable.
   */
  onSave() {
    const { onEntrySave, value } = this.props;
    onEntrySave(value);
  }

  /*
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways. I personally think this makes it more reusable.
   */
  onChange(event) {
    const { onEntryChange } = this.props;
    onEntryChange(event.target.value);
  }

  /*
   * @param  {object} event
   */
  onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.onSave();
    }
  }

  click() {
    console.log(this.props.test());

  }

  render() {
    const { className, placeholder, value } = this.props;
    return (
      <input
        className={className}
        placeholder={placeholder}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        onClick={this.click.bind(this)}
        value={value}
        autoFocus />
    );
  }
}

TopicTextInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onEntrySave: PropTypes.func,
  onEntryChange: PropTypes.func
};


function mapStateToProps(state) {
  return {

  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { test })(TopicTextInput);
