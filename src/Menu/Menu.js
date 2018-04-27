import React, { Component } from 'react';
import Button from '../Button/Button'
import calendarStore from '../CalendarStore'
import {observer} from 'mobx-react'
import './Menu.css';

@observer
export default class extends Component {
  render() {
    return (
      <div className="menu-wrap">
        <div className="menu">
          <Button onClick={() => calendarStore.today()}>Today</Button>
          <Button onClick={() => calendarStore.prevPeriod()}>&lt;</Button>
          <Button onClick={() => calendarStore.nextPeriod()}>&gt;</Button>
          <div className="date">{calendarStore.dateRange}</div>
          <Button checked={calendarStore.type === 'week'} onClick={() => calendarStore.setType('week')}>Week</Button>
          <Button checked={calendarStore.type === 'month'} onClick={() => calendarStore.setType('month')}>Month</Button>
        </div>
      </div>
    );
  }
}
