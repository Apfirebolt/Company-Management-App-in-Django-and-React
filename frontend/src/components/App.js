/**
 * Created by hp on 09-08-2020.
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import HomePageComponent from '../pages/Home';
import AccountsPageComponent from '../pages/Account';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../store/index';

const store = createStore(rootReducer, applyMiddleware(thunk));

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="container">
                    <Router>
                      <div className="container">
                        <Switch>
                          <Route exact path="/" component={HomePageComponent} />
                          <Route exact path="/accounts" component={AccountsPageComponent} />
                        </Switch>
                      </div>
                    </Router>
                </div>
            </Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById("app"));