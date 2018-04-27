import React, { Component } from 'react';
import './Calendar.css'
import Table from "../Table/Table";
import Menu from "../Menu/Menu";
import {observer} from 'mobx-react'
import calendarStore from "../CalendarStore";
import EventModal from "../EventModal/EventModal";

@observer
export default class Calendar extends Component {
  render() {
    return (
        <div className="calendar">
          {calendarStore.modal ? <EventModal/> : ''}
          <Menu/>
          <Table/>
        </div>
    );
  }
}
