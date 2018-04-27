import React, { Component } from 'react';
import './Table.css'
import calendarStore from '../CalendarStore'
import {observer} from 'mobx-react'
import WeekTable from './WeekTable'
import MonthTable from "./MonthTable";


@observer
export default class extends Component {
  render() {
    if (calendarStore.type === 'week') {
      return <WeekTable/>;
    }

    if (calendarStore.type === 'month') {
      return <MonthTable/>;
    }
  }
}
