import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'rodal/lib/rodal.css';
import 'antd/dist/antd.css';
import "video-react/dist/video-react.css"

// jquery
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(<App />, document.getElementById('root'));