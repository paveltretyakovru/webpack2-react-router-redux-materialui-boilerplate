// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import { configureStore } from './configure-store';

const store = configureStore();
const historyOptions = [ hashHistory, store, { adjustUrlOnReplay: false } ];
const history = syncHistoryWithStore(...historyOptions);

ReactDOM.render(
        <MuiThemeProvider>
    <Provider store={ store }>
        <Router history={ history }>
            { routes }
        </Router>
    </Provider>
          </MuiThemeProvider>
,
  document.getElementById('root')
);