import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as companyTypes from '../store/company/companyActions';
import PropTypes from 'prop-types';

class ListCompanyComponent extends Component {
    constructor() {
        super();

        this.openCompanyDetails = this.openCompanyDetails.bind(this);
    }

    openCompanyDetails(post_id) {
        const { openDetailModal, getCompanyDetail } = this.props;
        getCompanyDetail(post_id);
        openDetailModal();
    }

    render() {
        let { companyName, companyOwner, companyShares, companyEmployees, companyWorth, postId,
            openDeleteModal, editCompany } = this.props;
        return (
            <tr>
                <td>{companyName}</td>
                <td>{companyOwner}</td>
                <td>{companyWorth}</td>
                <td>{companyEmployees}</td>
                <td>{companyShares}</td>
                <td className="has-text-centered">
                    <button className="button has-background-danger has-text-white" onClick={() => {openDeleteModal(postId)}}>Delete</button>
                    <button className="button has-background-info has-text-white" onClick={() => {this.openCompanyDetails(postId)}}>Details</button>
                    <button className="button has-background-success has-text-white" onClick={() => {editCompany(postId)}}>Update</button>
                </td>
            </tr>
        )
    }
}

ListCompanyComponent.propTypes = {
  postId: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  companyOwner: PropTypes.string.isRequired,
  companyEmployees: PropTypes.number.isRequired,
  companyShares: PropTypes.number.isRequired,
  companyWorth: PropTypes.number.isRequired,
  companyImage: PropTypes.string.isRequired,
  openDetailModal: PropTypes.func.isRequired,
  getCompanyDetail: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  editCompany: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCompanyComponent);
