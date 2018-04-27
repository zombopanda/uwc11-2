import React, { Component } from 'react';
import './Table.css'
import calendarStore from '../CalendarStore'
import {observer} from 'mobx-react'
import moment from "moment";


@observer
export default class extends Component {
  getEvents(date, time) {
    date.hours(time.hours()).minutes(time.minutes());
    return calendarStore.events.filter(event => date.isSameOrAfter(event.startDate) && date.isSameOrBefore(event.endDate));
  }

  stringToColour(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  render() {
    const size = [48, 7];
    let date = calendarStore.startDate.clone().subtract(1, 'day');
    let date2 = date.clone().add(1, 'day');
    let time = moment().hours(23).minutes(30);


    return (
      <table className="table week">
        <tbody>
          <tr>
            <td/>
            {[...Array(size[1])].map((_, j) =>
              <td key={j}>{date.add(1, 'day').format('ddd M/D')}</td>
            )}
          </tr>

          {[...Array(size[0])].map((_, i) =>
            <tr key={i}>
              <td>{time.add(30, 'minutes').minutes() === 0 ? time.format('HH:mm') : ''}</td>
              {[...Array(size[1])].map((_, j) =>
                <td
                    onClick={(time => () => calendarStore.addEvent(date2.clone().add(j, 'days'), time))(time.clone())}
                    key={j}>
                  {this.getEvents(date2.clone().add(j, 'days'), time).map((event, i) =>
                    <div className="event" style={{backgroundColor: this.stringToColour(event.name)}} key={i} onClick={(e) => { e.stopPropagation(); calendarStore.editEvent(event)} }/>
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
