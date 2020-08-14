import React, { Component } from 'react';
import { connect } from 'react-redux';
import './companyStyles.scss';
import PropTypes from 'prop-types';


class AddCompanyModal extends Component {
    constructor() {
        super();
        this.state = {
            companyName: '',
            companyOwner: '',
            companyEmployees: 0,
            companyShares: 0,
            companyWorth: 0,
            companyImage: null,
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitData = this.submitData.bind(this);
        this.clearData = this.clearData.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    componentDidMount() {
        let { mode, companyData } = this.props;
        if(mode == 'Edit') {
            this.setState({
                companyName: companyData.company_name,
                companyOwner: companyData.company_owner,
                companyEmployees: companyData.company_employees,
                companyShares: companyData.company_shares,
                companyWorth: companyData.company_worth,
                companyImage: companyData.company_logo
            })
        }
    }

    handleInputChange(e) {
        let currentField = e.target.name;
        let currentValue = e.target.value;
        switch(currentField) {
            case 'company_name':
                this.setState({
                    companyName: currentValue
                })
                break;
            case 'company_owner':
                this.setState({
                    companyOwner: e.target.value
                })
                break;
            case 'company_employees':
                this.setState({
                    companyEmployees: e.target.value
                })
                break;
            case 'company_worth':
                this.setState({
                    companyWorth: e.target.value
                })
                break;
            case 'company_shares':
                this.setState({
                    companyShares: e.target.value
                })
                break;
        }
    }

    onFileChange(event) {
        let { companyImage } = this.state;
        this.setState({ companyImage: event.target.files[0] });
        console.log(companyImage);
    };

    validateForm() {
    let { companyName, companyOwner, companyEmployees, companyWorth, companyShares, companyImage } = this.state;
    let errors = {};
    let formIsValid = true;

    if (!companyName) {
      formIsValid = false;
      errors["company_name"] = "Please enter your company name.";
    }

    if (!companyOwner) {
      formIsValid = false;
      errors["company_owner"] = "Please enter name of the company owner.";
    }

    if (!companyEmployees) {
      formIsValid = false;
      errors["company_employees"] = "Please enter how many employees work in your company.";
    }

    if (!companyWorth) {
      formIsValid = false;
      errors["company_worth"] = "Please enter how much worth your company is.";
    }

    if (!companyShares) {
      formIsValid = false;
      errors["company_shares"] = "Please enter how much shares your company has.";
    }

    if (!companyImage) {
      formIsValid = false;
      errors["company_image"] = "Please upload your company logo.";
    }

    this.setState({
      errors: errors
    });
        return formIsValid;
    }

    submitData() {
        let {  companyName, companyOwner, companyEmployees, companyWorth, companyShares, companyImage } = this.state;
        let { mode, addCompany, editCompany, companyData } = this.props;
        event.preventDefault();

        if (this.validateForm()) {
          const formData = new FormData();

          formData.append("company_name", companyName);
          formData.append("company_owner", companyOwner);
          formData.append("company_worth", companyWorth);
          formData.append("company_shares", companyShares);
          formData.append("company_employees", companyEmployees);
          formData.append("company_logo", companyImage);

          // Calling the API function
          if(mode == 'Edit') {
              let data = {
                  actualFormData: formData,
                  id: companyData.id
              }
              editCompany(data);
          }
          else {
              addCompany(formData);
          }
          this.props.closeCompanyModal();
        }
    }

    clearData() {
        event.preventDefault();
        this.setState({
            companyName: '',
            companyOwner: '',
            companyEmployees: 0,
            companyShares: 0,
            companyWorth: 0,
            companyImage: null,
            errors: {}
        })
    }
    render() {
        let { companyName, companyOwner, companyEmployees, companyWorth, companyShares, companyImage, errors } = this.state;
        let { mode, companyData, editCompany } = this.props;
        return (
            <form className="modal_container" method="post" encType="multipart/form-data">
                <p className="title has-text-centered">{mode == 'Edit' ? 'EDIT COMPANY' : 'ADD COMPANY'}</p>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label" htmlFor="company_name">Company Name</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input className="input" name="company_name" id="company_name" type="text"
                               placeholder="Company Name" value={companyName}
                               onChange={(e) => {this.handleInputChange(e)}}/>
                      </p>
                    </div>
                  </div>
                 {errors.company_name &&
                    <p className="has-text-danger">{errors.company_name}</p>
                 }
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label" htmlFor="company_owner">Company Owner</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input className="input" name="company_owner" type="text" id="company_owner"
                               value={companyOwner} placeholder="Company Owner" onChange={(e) => {this.handleInputChange(e)}} />
                      </p>
                    </div>
                  </div>
                  {errors.company_owner &&
                    <p className="has-text-danger">{errors.company_owner}</p>
                  }
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label" htmlFor="company_employees">Company Employees</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input className="input" name="company_employees" type="text" id="company_employees"
                               value={companyEmployees} placeholder="Company Employees" onChange={(e) => {this.handleInputChange(e)}} />
                      </p>
                    </div>
                  </div>
                  {errors.company_employees &&
                    <p className="has-text-danger">{errors.company_employees}</p>
                  }
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Company Worth</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input className="input" name="company_worth" type="number" id="company_worth"
                               value={companyWorth} placeholder="Company Worth" onChange={(e) => {this.handleInputChange(e)}} />
                      </p>
                    </div>
                  </div>
                  {errors.company_worth &&
                    <p className="has-text-danger">{errors.company_worth}</p>
                  }
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Company Shares</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input className="input" name="company_shares" type="number" id="company_shares"
                               value={companyShares} placeholder="Company Shares" onChange={(e) => {this.handleInputChange(e)}} />
                      </p>
                    </div>
                  </div>
                  {errors.company_shares &&
                    <p className="has-text-danger">{errors.company_shares}</p>
                  }
                </div>

                <div className="file has-name is-centered">
                  <label className="file-label">
                    <input className="file-input" type="file" name="company_logo" onChange={this.onFileChange} />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">
                        Upload Company Logo
                      </span>
                    </span>
                    <span className="file-name">
                        {companyImage ? companyImage.name : 'No company logo uploaded.'}
                    </span>
                  </label>
                </div>

                <div className="button_container">
                    <button className="button has-background-success" onClick={this.submitData}>
                        {mode == 'Edit' ? 'Update Company' : 'Add Company'}</button>
                    <button className="button has-background-grey-dark" onClick={this.clearData}>
                        Clear Data</button>
                    <button className="button has-background-grey-light" onClick={this.props.closeCompanyModal}>
                        Go Back</button>
                </div>
            </form>
        )
    }
}

AddCompanyModal.propTypes = {
  addCompany: PropTypes.func.isRequired,
  editCompany: PropTypes.func.isRequired,
  closeCompanyModal: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  companyData: PropTypes.object
}

const mapStateToProps = state => {
  return {
    currentUser: state.accounts.user,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (payload) => {
      dispatch(actionTypes.login(payload));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCompanyModal);

