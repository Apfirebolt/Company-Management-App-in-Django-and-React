import * as companyTypes from './companyTypes';
import authInstance from '../../interceptors/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenConfig } from '../accounts/accountActions';


const toastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

// LIST ALL COMPANIES
export const listCompanies = () => (dispatch, getState) => {
  authInstance
    .get("company/api", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: companyTypes.LIST_COMPANY,
        val: res.data
      });
    })
    .catch(err => {
      console.error(err);
      toast.error("Failed to fetch companies! Some error occurred.", toastOptions);
    });
};

// ADD A COMPANY
export const addCompany = (payload) => (dispatch, getState) => {
  authInstance
    .post("company/api", payload, tokenConfig(getState))
    .then(res => {
      toast.success("New company data successfully added!", toastOptions);
      dispatch(companyTypes.LIST_COMPANY);
    })
    .catch(err => {
      console.error(err);
      toast.error("Failed to post company data! Some error occurred.", toastOptions);
    });
};

// UPDATE COMPANY
export const updateCompany = (payload) => {
  return (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  authInstance
    .post("accounts/api/register", payload, config)
    .then(res => {
      dispatch({
        type: accountTypes.REGISTER_SUCCESS,
        val: res.data.token
      });
      toast.success('Company data successfully updated!', toastOptions);
    })
    .catch(err => {
      toast.error("Failed to update this company.", toastOptions);
    });
  }
}

// DELETE COMPANY
export const deleteCompany = (company_id) => {
  return (dispatch, getState) => {
  authInstance
    .delete("company/api/" + company_id, tokenConfig(getState))
    .then(res => {
      toast.success('Company was successfully deleted!', toastOptions);
    })
    .catch(err => {
      console.error(err);
      toast.error("Failed to delete company data! Some error occurred.", toastOptions);
    });
  }
}

// DETAIL COMPANY
export const detailCompany = (company_id) => {
  return (dispatch, getState) => {

  authInstance
    .get("company/api/" + company_id, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: companyTypes.DETAIL_COMPANY,
        val: res.data
      });
    })
    .catch(err => {
      toast.error("Failed to get company detail! Some error occurred.", toastOptions);
    });
  }
}

// RESET COMPANY DETAIL WHEN COMPONENT UNMOUNTS
export const resetDetailCompany = () => {
  return (dispatch) => {
    try {
      dispatch({
        type: companyTypes.DETAIL_COMPANY,
        val: null
      });
    }
    catch(err) {
      console.error(err);
    }
  }
}




