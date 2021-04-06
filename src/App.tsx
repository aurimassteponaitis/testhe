import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '@Store/store';
import HomePage from '@Routes/HomePage';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/" exact={true} component={HomePage} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
