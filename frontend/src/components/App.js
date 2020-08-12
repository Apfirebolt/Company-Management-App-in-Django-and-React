/**
 * Created by hp on 09-08-2020.
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import HomePageComponent from '../pages/Home';
import AccountsPageComponent from '../pages/AccountRoutes';
import RegisterPage from '../pages/Register';
import LoginPage from '../pages/Login';
import DashboardPage from '../pages/Dashboard';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../store/index';
import { ToastContainer } from 'react-toastify';
import { loadUser } from "../store/accounts/accountActions";
import PrivateRoute from '../common/privateRoute';


const store = createStore(rootReducer, applyMiddleware(thunk));

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    render() {
        return (
            <Provider store={store}>
                <div className="container">
                    <Router>
                      <div className="container">
                      <ToastContainer/>
                        <Switch>
                          <Route exact path="/" component={HomePageComponent} />
                          <Route exact path="/accounts" component={AccountsPageComponent} />
                          <Route exact path="/register" component={RegisterPage} />
                          <Route exact path="/login" component={LoginPage} />
                          <PrivateRoute exact path="/dashboard" component={DashboardPage} />
                        </Switch>
                      </div>
                    </Router>
                </div>
            </Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById("app"));