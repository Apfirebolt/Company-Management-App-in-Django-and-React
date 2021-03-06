import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import './accountStyles.scss';
import { connect } from 'react-redux';
import * as actionTypes from '../store/accounts/accountActions';


class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            userPassword: '',
            errors: {}
        };
        this.resetForm = this.resetForm.bind(this);
        this.onDataSubmit = this.onDataSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    resetForm(e) {
        e.preventDefault();
        let { userName, userPassword, errors } = this.state;
        this.setState({
            userName: '',
            userPassword: '',
        });
    }

    onDataSubmit() {
        let { userName, userPassword, errors } = this.state;
        let { userLogin } = this.props;
        event.preventDefault();

        if (this.validateForm()) {
          let data = {
            username: userName,
            password: userPassword
          }
          userLogin(data);

          userName = "";
          userPassword = "";

          this.setState({
            userName,
            userPassword,
          });
        }
    }

    handleInputChange(e) {
        let currentField = e.target.name;
        let currentValue = e.target.value;
        switch(currentField) {
            case 'username':
                this.setState({
                    userName: currentValue
                })
                break;
            case 'password':
                this.setState({
                    userPassword: e.target.value
                })
                break;
        }
    }
    validateForm() {
    let { userName, userPassword } = this.state;
    let errors = {};
    let formIsValid = true;

    if (!userName) {
      formIsValid = false;
      errors["username"] = "Please enter your username.";
    }

    if (!userPassword) {
      formIsValid = false;
      errors["password"] = "Please enter your password.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
    }

    render() {
        let { userName, userPassword, errors } = this.state;
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <div className="form form_container">
                <h1 className="title has-text-centered">LOGIN</h1>
                <div className="field">
                  <label className="label" htmlFor="username">Please Enter Your Username</label>
                  <div className="control">
                    <input className="input" id="username" name="username" type="text" value={userName}
                           placeholder="Enter Username" onChange={(e) => {this.handleInputChange(e)}} />
                  </div>
                    {errors.username &&
                    <p className="has-text-danger">
                        {errors.username}
                    </p>
                    }
                </div>


                <div className="field">
                  <label className="label" htmlFor="password">Please Enter Your Password</label>
                  <div className="control">
                    <input className="input" id="password" name="password" type="password" value={userPassword}
                           placeholder="Enter Your Password" onChange={(e) => {this.handleInputChange(e)}} />
                  </div>
                    {errors.password &&
                    <p className="has-text-danger">
                        {errors.password}
                    </p>
                    }
                </div>


                <div className="button_container">
                    <button className="button is-light" onClick={(e) => {this.onDataSubmit(e)}}>Submit</button>
                    <button className="button is-dark" onClick={(e) => {this.resetForm(e)}}>Reset</button>
                </div>

                <hr/>

                <div>
                    <Link to="/register"><p className="has-text-white">DO NOT HAVE AN ACCOUNT ? CLICK HERE</p></Link>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.accounts.isAuthenticated,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (payload) => {
      dispatch(actionTypes.login(payload));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
