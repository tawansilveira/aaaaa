import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';
import RouterConfig from './router/router_config';
import { RouterProvider } from 'react-router-dom';



ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={RouterConfig}/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
