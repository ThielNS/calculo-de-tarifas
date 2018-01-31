import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { LocaleProvider } from 'antd';
import ptBRAntd from 'antd/lib/locale-provider/pt_BR';
import 'moment/locale/pt-br';
import moment from 'moment';
import reducers from './reducers';

// Layouts
import DefautLayout from './layouts/DefautLayout';
import LandingPageLayout from './layouts/LandingPageLayout';

// Pages
import MainPage from './pages/MainPage';
import LandingPage from './pages/LandingPage';

// Style
import './assets/styles/index.less';

moment.locale('pt-br');

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={ptBRAntd}>
          <Router>
            <Switch>
              {/*<LandingPageLayout exact path="/" component={LandingPage}/>*/}
              <DefautLayout exact path="/list" component={MainPage}/>
            </Switch>
          </Router>
        </LocaleProvider>
      </Provider>
    );
  }
}

export default App;
