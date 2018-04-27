import React, { Component } from 'react';
import './Modal.css';
import calendarStore from "../CalendarStore";
import Button from "../Button/Button";

export default class extends Component {
  ok() {
    calendarStore.hideModal();
    this.props.onOk();
  }

  cancel() {
    calendarStore.hideModal();
    this.props.onCancel();
  }

  render() {
    return (
      <div className='modal-wrap'>
        <div onClick={this.cancel.bind(this)} className='modal-close'/>
        <div className="modal">
          <div className="modal-body">
            {this.props.children}
          </div>
          <div className="modal-buttons">
            <Button onClick={this.ok.bind(this)}>Ok</Button>
            <Button onClick={this.cancel.bind(this)}>Cancel</Button>
          </div>
        </div>
      </div>
    );
  }
}
