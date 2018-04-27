import React, { Component } from 'react';
import './Table.css'
import calendarStore from '../CalendarStore'
import {observer} from 'mobx-react'


@observer
export default class extends Component {
  getEvents(date) {
    return calendarStore.events.filter(event => date.isSameOrAfter(event.startDate.clone().startOf('day')) && date.isSameOrBefore(event.endDate.clone().endOf('day')));
  }

  render() {
    const size = [5, 7];

    let weekday = calendarStore.startDate.isoWeekday();
    let date = calendarStore.startDate.clone().subtract(weekday, 'day');
    let date2 = date.clone();

    return (
      <table className="table month">
        <tbody>
          <tr>
            {[...Array(size[1])].map((_, j) =>
              <td key={j}>{date2.add(1, 'day').format('ddd')}</td>
            )}
          </tr>
          {[...Array(size[0])].map((_, i) =>
            <tr key={i}>
              {[...Array(size[1])].map((_, j) =>
                <td key={j} onClick={(date => () => calendarStore.selectDate(date.add(1, 'day')))(date.clone())}>
                  {date.add(1, 'day').format('DD') }

                  {this.getEvents(date.clone()).map((event, i) =>
                    <div className="event" key={i}/>
                  )}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}
