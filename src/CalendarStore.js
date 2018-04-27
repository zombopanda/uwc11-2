import { observable, action, computed, autorunAsync, toJS } from 'mobx';
import moment from 'moment'

class CalendarStore {
  @observable startDate = moment().startOf('isoweek');
  @observable type = 'week';
  @observable modal = false;
  @observable addEventName = '';
  @observable addEventStartDate = moment();
  @observable addEventEndDate = moment();
  @observable addEventObject = null;
  @observable events = [];

  @action nextPeriod() {
    this.startDate = this.startDate.clone().add(1, this.type)
  }

  @action prevPeriod() {
    this.startDate = this.startDate.clone().subtract(1, this.type)
  }

  @action today() {
    this.startDate = moment();
    this.setType(this.type)
  }

  @action showModal() {
    this.modal = true;
  }

  @action hideModal() {
    this.modal = false;
  }

  @action setType(type) {
    if (type === 'week') {
      this.startDate = this.startDate.clone().startOf('isoweek');
    }
    if (type === 'month') {
      this.startDate = this.startDate.clone().startOf('month');
    }
    this.type = type;
  }

  @action selectDate(date) {
    this.startDate = date;
    this.setType('week');
  }

  @action addEvent(date, time) {
    this.addEventStartDate = date.hours(time.format('HH')).minutes(time.format('mm'));
    this.addEventEndDate = this.addEventStartDate.clone().add(30, 'minutes');
    this.showModal();
  }

  @action editEvent(event) {
    this.addEventObject = event;
    this.addEventStartDate = event.startDate;
    this.addEventEndDate = event.endDate;
    this.addEventName = event.name;
    this.showModal();
  }

  @action clearEvent() {
    this.addEventStartDate = moment();
    this.addEventEndDate = moment();
    this.addEventName = '';
    this.addEventObject = null;
  }

  @action deleteEvent() {
    this.events.remove(this.addEventObject);
    this.hideModal();
  }

  @action saveEvent() {
    if (this.addEventObject) {
      this.addEventObject.startDate = this.addEventStartDate;
      this.addEventObject.endDate = this.addEventEndDate;
      this.addEventObject.name = this.addEventName;
    } else {
      this.events.push({startDate: this.addEventStartDate, endDate: this.addEventEndDate, name: this.addEventName});
    }

    this.clearEvent();
  }

  @computed get dateRange() {
    if (this.type === 'week') {
      return this.startDate.format('MMM D') + ' - ' + this.startDate.clone().add(7, 'days').format('MMM D, YYYY');
    }

    if (this.type === 'month') {
      return this.startDate.format('MMM YYYY');
    }
  }
}

const store = new CalendarStore();

let fromStorage = localStorage.getItem('calendarStore');

if (fromStorage) {
  let data = JSON.parse(fromStorage);

  for (let k in data) {
    if (k === 'events') {
      data[k].forEach((event) => {
        for (let k in event) {
          if (k.match(/date/i)) {
            event[k] = moment(event[k]);
          } else {
            event[k] = event[k];
          }
        }
        store.events.push(event);
      })
    } else {
      if (k.match(/date/i)) {
        store[k] = moment(data[k]);
      } else {
        store[k] = data[k];
      }
    }
  }
}

autorunAsync(() => {
  localStorage.setItem('calendarStore', JSON.stringify(toJS(store)))
});

export default store;
export { CalendarStore };
