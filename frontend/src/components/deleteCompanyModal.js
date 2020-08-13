import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as companyTypes from '../store/company/companyActions';
import PropTypes from 'prop-types';

class DeleteCompanyComponent extends Component {

    render() {
        const { currentCompany, deleteCompany } = this.props;
        return (
            <div className="form_container">
               <p className="title">
                   Do you want to delete the company <span className="has-text-white">
                   "{currentCompany.company_name}"</span>
               </p>

                <button className="button has-text-white has-background-danger" onClick={() => {deleteCompany(currentCompany.id)}}>
                    Yes, Delete {currentCompany.company_name}
                </button>
            </div>
        )
    }
}

DeleteCompanyComponent.propTypes = {
  currentCompany: PropTypes.object.isRequired,
  deleteCompany: PropTypes.func.isRequired,
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
