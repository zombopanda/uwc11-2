import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Calendar from "./Calendar/Calendar";
import './index.css'

ReactDOM.render(<Calendar/>, document.getElementById('root'));
registerServiceWorker();
