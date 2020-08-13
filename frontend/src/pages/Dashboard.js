import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/accounts/accountActions';
import * as companyTypes from '../store/company/companyActions';
import AddCompanyComponent from '../components/addCompany';
import ListCompanyComponent from '../components/listCompany';
import DetailCompanyModal from '../components/detailCompany';
import DeleteCompanyModal from '../components/deleteCompanyModal';

class DashboardPage extends Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            detailModalOpen: false,
            isDeleteModalOpen: false,
            selectedCompanyData: null,
            mode: 'Add'
        }
        this.openDetailModal = this.openDetailModal.bind(this);
        this.closeDetailModal = this.closeDetailModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.openAddCompanyModal = this.openAddCompanyModal.bind(this);
        this.closeAddCompanyModal = this.closeAddCompanyModal.bind(this);
        this.editCompany = this.editCompany.bind(this);
    }

    editCompany(post_id) {
        let { isModalOpen, mode } = this.state;
        let { allCompanies } = this.props;
         this.setState({
            isModalOpen: true,
            mode: 'Edit'
         });

         let deletedCompany = allCompanies.filter((item) => {
             return item.id == post_id;
         });
         this.setState({
             selectedCompanyData: deletedCompany[0]
         })
    }

    openAddCompanyModal() {
        let { isModalOpen, mode } = this.state;
         this.setState({
            isModalOpen: true,
            mode: 'Add'
         });
    }

    closeAddCompanyModal() {
        let { isModalOpen } = this.state;
         this.setState({
            isModalOpen: false
         });
    }

    openDetailModal() {
         let { detailModalOpen } = this.state;
         this.setState({
            detailModalOpen: true
         });
    }

    closeDetailModal() {
        let { detailModalOpen } = this.state;
         this.setState({
            detailModalOpen: false
         });
    }

    openDeleteModal(post_id) {
        let { isDeleteModalOpen } = this.state;
        let { allCompanies } = this.props;
         this.setState({
            isDeleteModalOpen: true
         });
         let deletedCompany = allCompanies.filter((item) => {
             return item.id == post_id;
         });
         this.setState({
             selectedCompanyData: deletedCompany[0]
         })
    }

    closeDeleteModal() {
        let { isDeleteModalOpen } = this.state;
         this.setState({
            isDeleteModalOpen: false
         });
    }

    modalToggle() {
        let { isModalOpen } = this.state;
        this.setState({
            isModalOpen: !isModalOpen
        });
    }
    componentDidMount() {
        let { currentUser, getCompaniesAction } = this.props;
        getCompaniesAction();
        if(!currentUser) {
            this.props.loadCurrentUser();
        }
    }
    render() {
        let { currentUser, userLogout, allCompanies, getCompanyDetail, currentCompany, deleteCompany,
            addCompany, updateCompany } = this.props;
        let { isModalOpen, detailModalOpen, isDeleteModalOpen, selectedCompanyData, mode } = this.state;

        return (
            <div className="container">
                {isDeleteModalOpen &&
                    <DeleteCompanyModal
                        deleteCompany={deleteCompany}
                        currentCompany={selectedCompanyData}
                        closeDeleteModal={this.closeDeleteModal}
                    />
                }
                {isModalOpen &&
                    <AddCompanyComponent
                        addCompany={addCompany}
                        closeCompanyModal={this.closeAddCompanyModal}
                        mode={mode}
                        editCompany={updateCompany}
                        companyData={selectedCompanyData}
                    />
                }
                {detailModalOpen && currentCompany &&
                    <DetailCompanyModal
                        postId={currentCompany.id}
                        companyName={currentCompany.company_name}
                        companyOwner={currentCompany.company_owner}
                        companyShares={currentCompany.company_shares}
                        companyEmployees={currentCompany.company_employees}
                        companyWorth={currentCompany.company_worth}
                        companyImage={currentCompany.company_logo}
                        closeDetailModal={this.closeDetailModal}
                    />
                }
                <nav className="navbar" role="navigation" aria-label="main navigation">
                  <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <p className="title">Hello, {currentUser && currentUser.username}</p>
                    </div>
                    <div className="navbar-end">
                      <div className="navbar-item">
                        <div className="buttons">
                          <button className="button is-primary" onClick={() => {this.openAddCompanyModal()}}>
                            Add Company
                          </button>
                          <button className="button is-light" onClick={() => {userLogout()}}>
                            Log Out
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>

                <table className="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Owner</th>
                      <th>Employees</th>
                      <th>Shares</th>
                      <th>Turn Over</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {allCompanies ? allCompanies.map((item, index) => {
                    return (
                          <ListCompanyComponent key={index}
                                                  postId={item.id}
                                                  companyName={item.company_name}
                                                  companyOwner={item.company_owner}
                                                  companyShares={item.company_shares}
                                                  companyEmployees={item.company_employees}
                                                  companyWorth={item.company_worth}
                                                  companyImage={item.company_logo}
                                                  openDetailModal={this.openDetailModal}
                                                  getCompanyDetail={getCompanyDetail}
                                                  openDeleteModal={this.openDeleteModal}
                                                  editCompany={this.editCompany}
                            />
                      )
                  })
                  : null}
                  </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    currentUser: state.accounts.user,
    allCompanies: state.company.companies,
    currentCompany: state.company.company_detail
  }
};

const mapDispatchToProps = dispatch => {
  return {
    userLogout: (payload) => {
      dispatch(actionTypes.logout());
    },
    loadCurrentUser: () => {
        dispatch(actionTypes.loadUser())
    },
    getCompaniesAction: () => {
        dispatch(companyTypes.listCompanies())
    },
    getCompanyDetail: (company_id) => {
        dispatch(companyTypes.detailCompany(company_id))
    },
    deleteCompany: (company_id) => {
        dispatch(companyTypes.deleteCompany(company_id))
    },
    addCompany: (payload) => {
        dispatch(companyTypes.addCompany(payload));
    },
    updateCompany: (company_id) => {
        dispatch(companyTypes.updateCompany(company_id))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
