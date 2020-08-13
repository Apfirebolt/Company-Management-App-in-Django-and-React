import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as companyTypes from '../store/company/companyActions';
import PropTypes from 'prop-types';

class DeleteCompanyComponent extends Component {
    constructor() {
        super();
        this.deleteCompanyHelper = this.deleteCompanyHelper.bind(this);
    }

    deleteCompanyHelper(post_id) {
        this.props.deleteCompany(post_id);
        this.props.closeDeleteModal();
    }

    render() {
        const { currentCompany } = this.props;
        return (
            <div className="form_container">
               <p className="title">
                   Do you want to delete the company <span className="has-text-white">
                   "{currentCompany.company_name}"</span>
               </p>

                <button className="button has-text-white has-background-danger" onClick={() => {this.deleteCompanyHelper(currentCompany.id)}}>
                    Yes, Delete {currentCompany.company_name}
                </button>
                <button className="button has-text-white has-background-success" onClick={() => {this.props.closeDeleteModal()}}>
                    Nope
                </button>
            </div>
        )
    }
}

DeleteCompanyComponent.propTypes = {
  currentCompany: PropTypes.object.isRequired,
  deleteCompany: PropTypes.func.isRequired,
  closeDeleteModal: PropTypes.func.isRequired
}


const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCompanyComponent);
