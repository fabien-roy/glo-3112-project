import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import ReactGA from 'react-ga';
import { Integrations } from '@sentry/tracing';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: `${process.env.REACT_APP_NAME}@${process.env.npm_package_version}`,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

if (process.env.REACT_APP_GA_TRACKING_ID) {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
