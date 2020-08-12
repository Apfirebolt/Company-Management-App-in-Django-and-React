import React, { Component } from 'react';
import './accountStyles.scss';
import { connect } from 'react-redux';
import * as actionTypes from '../store/accounts/accountActions';


class RegisterPage extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            userEmail: '',
            userPassword: '',
            userConfirmPassword: '',
            errors: {}
        };
        this.resetForm = this.resetForm.bind(this);
        this.onDataSubmit = this.onDataSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    resetForm(e) {
        e.preventDefault();
        let { userName, userEmail, userPassword, userConfirmPassword, errors } = this.state;
        this.setState({
            userName: '',
            userEmail: '',
            userPassword: '',
            userConfirmPassword: ''
        });
    }

    onDataSubmit() {
        let { userName, userEmail, userPassword, userConfirmPassword, errors } = this.state;
        let { registerUser } = this.props;
        event.preventDefault();

        if (this.validateForm()) {
          let data = {
            username: userName,
            email: userEmail,
            password: userPassword
          }
          // Calling register function
            console.log('Calling register function..', data);
          registerUser(data);

          userName = "";
          userEmail = "";
          userPassword = "";
          userConfirmPassword = "";

          this.setState({
            userName,
            userEmail,
            userPassword,
            userConfirmPassword
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
            case 'email':
                this.setState({
                    userEmail: e.target.value
                })
                break;
            case 'password':
                this.setState({
                    userPassword: e.target.value
                })
                break;
            case 'confirm_password':
                this.setState({
                    userConfirmPassword: e.target.value
                })
                break;
        }
    }
    validateForm() {
    let { userName, userEmail, userPassword, userConfirmPassword } = this.state;
    let errors = {};
    let formIsValid = true;

    if (!userName) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
    }

    if (typeof userName !== "undefined") {
      if (!userName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["username"] = "*Please enter alphabet characters only.";
      }
    }

    if (!userEmail) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof userEmail !== "undefined") {
      //regular expression for email validation
      let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(userEmail)) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }

    if (!userPassword) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (!userConfirmPassword) {
      formIsValid = false;
      errors["confirm_password"] = "*Please confirm your password.";
    }

    if(typeof userConfirmPassword !== "undefined" && userConfirmPassword !== userPassword) {
      formIsValid = false;
      errors["confirm_password"] = "*Passwords you entered did not match.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
    }
    render() {
        let { userName, userEmail, userPassword, userConfirmPassword, errors } = this.state;
        return (
            <div className="form form_container">
                <h1 className="title has-text-centered">REGISTER</h1>
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
                  <label className="label" htmlFor="email">Please Enter Your Email</label>
                  <div className="control">
                    <input className="input" id="email" name="email" type="email" value={userEmail}
                           placeholder="Enter Your Email" onChange={(e) => {this.handleInputChange(e)}} />
                  </div>
                    {errors.email &&
                    <p className="has-text-danger">
                        {errors.email}
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

                <div className="field">
                  <label className="label" htmlFor="confirm_password">Please Confirm Your Password</label>
                  <div className="control">
                    <input className="input" id="confirm_password" name="confirm_password" type="password"
                           placeholder="Enter Your Password Again" value={userConfirmPassword}
                           onChange={(e) => {this.handleInputChange(e)}} />
                  </div>
                    {errors.confirm_password &&
                    <p className="has-text-danger">
                        {errors.confirm_password}
                    </p>
                    }
                </div>

                <div className="button_container">
                    <button className="button is-light" onClick={(e) => {this.onDataSubmit(e)}}>Submit</button>
                    <button className="button is-dark" onClick={(e) => {this.resetForm(e)}}>Reset</button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    // allFriends: state.accounts.friend_list,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (data) => {
      dispatch(actionTypes.register(data));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
