import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as companyTypes from '../store/company/companyActions';
import AddCompanyComponent from '../components/addCompany';

class DetailCompanyComponent extends Component {
    componentWillUnmount() {
        this.props.resetDetails();
    }
    render() {
        const { companyName, companyOwner, companyEmployees, companyShares, companyWorth,
            companyImage, closeDetailModal } = this.props;
        return (
            <div className="form_container">
               <p className="title">
                   {companyName}
               </p>
               <hr/>
               <div className="is-flex">
                   <p className="sub-title">
                        Company Owner
                    </p>
                   <p className="sub-title">
                        {companyOwner}
                    </p>
               </div>

                <div className="is-flex">
                   <p className="sub-title">
                        Company Employees
                    </p>
                   <p className="sub-title">
                        {companyEmployees}
                    </p>
               </div>

                <div className="is-flex">
                   <p className="sub-title">
                        Company Worth
                    </p>
                   <p className="sub-title">
                        {companyWorth}
                    </p>
                </div>

                <div className="is-flex">
                   <p className="sub-title">
                        Company Shares
                    </p>
                   <p className="sub-title">
                        {companyShares}
                    </p>
                </div>

                <div className="is-flex">
                   <div>
                       <p className="sub-title">
                            Company Logo
                        </p>
                       <button className="button has-text-white"
                               onClick={closeDetailModal}>Close</button>
                   </div>
                   <img src={companyImage} alt="Company logo not available" height="300" width="300" />

                </div>

            </div>
        )
    }
}

DetailCompanyComponent.propTypes = {
  postId: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  companyOwner: PropTypes.string.isRequired,
  companyEmployees: PropTypes.number.isRequired,
  companyShares: PropTypes.number.isRequired,
  companyWorth: PropTypes.number.isRequired,
  companyImage: PropTypes.string.isRequired,
  closeDetailModal: PropTypes.func.isRequired,
}


const mapDispatchToProps = dispatch => {
  return {
      resetDetails: () => {
        dispatch(companyTypes.resetDetailCompany())
    }
  }
};

export default connect(null, mapDispatchToProps)(DetailCompanyComponent);
