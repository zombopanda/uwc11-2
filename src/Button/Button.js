import React, { Component } from 'react';
import './Button.css';
import cn from 'classnames'

export default class extends Component {
  render() {
    return (
      <div {...this.props} className={cn('button', {'checked': !!this.props.checked})}/>
    );
  }
}
