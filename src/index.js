import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

// bootstrap rtl for rtl support page
import "./assets/vendor/bootstrap-rtl/bootstrap-rtl.scss";
// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
// plugins styles downloaded
import "./assets/vendor/fullcalendar/dist/fullcalendar.min.css";
import "./assets/vendor/sweetalert2/dist/sweetalert2.min.css";
import "./assets/vendor/select2/dist/css/select2.min.css";
import "./assets/vendor/quill/dist/quill.core.css";
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// core styles
import "./assets/scss/argon-dashboard-pro-react.scss?v1.1.0";

import store from './store'

ReactDOM.render(
   <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
