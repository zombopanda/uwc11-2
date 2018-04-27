import React, { Component } from 'react';
import calendarStore from "../CalendarStore";
import Modal from "../Modal/Modal";
import {observer} from 'mobx-react'
import './EventModal.css'
import moment from "moment";
import Button from "../Button/Button";

@observer
export default class extends Component {
  changeForm(e) {
    if (e.target.name === 'startTime') {
      let time = moment(e.target.value, 'HH:mm');
      calendarStore.addEventStartDate = calendarStore.addEventStartDate.clone().hours(time.hours()).minutes(time.minutes());
    }

    if (e.target.name === 'endTime') {
      let time = moment(e.target.value, 'HH:mm');
      calendarStore.addEventEndDate = calendarStore.addEventEndDate.clone().hours(time.hours()).minutes(time.minutes());
    }

    if (e.target.name === 'startDate') {
      let date = moment(e.target.value);
      calendarStore.addEventStartDate = calendarStore.addEventStartDate.clone().date(date.date()).month(date.month()).year(date.year());
    }

    if (e.target.name === 'endDate') {
      let date = moment(e.target.value);
      calendarStore.addEventEndDate = calendarStore.addEventEndDate.clone().date(date.date()).month(date.month()).year(date.year());
    }
  }

  ok() {
    calendarStore.saveEvent();
  }

  cancel() {
    calendarStore.clearEvent();
  }

  render() {
    return (
      <Modal onOk={this.ok.bind(this)} onCancel={this.cancel.bind(this)}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={calendarStore.addEventName} onChange={(e) => calendarStore.addEventName = e.target.value}/>
          {calendarStore.addEventObject ? <Button onClick={() => calendarStore.deleteEvent()}>Delete</Button> : ''}
        </div>
        <div className="form-group">
          <label>Start date:</label>
          <input type="date" name="startDate" value={calendarStore.addEventStartDate.format('YYYY-MM-DD')} onChange={this.changeForm.bind(this)}/>
          <input type="time" step="1800" name="startTime" value={calendarStore.addEventStartDate.format('HH:mm')} onChange={this.changeForm.bind(this)}/>
        </div>
        <div className="form-group">
          <label>End date:</label>
          <input type="date" name="endDate" value={calendarStore.addEventEndDate.format('YYYY-MM-DD')} onChange={this.changeForm.bind(this)}/>
          <input type="time" step="1800" name="endTime" value={calendarStore.addEventEndDate.format('HH:mm')} onChange={this.changeForm.bind(this)}/>
        </div>
      </Modal>
    );
  }
}
