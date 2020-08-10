/**
 * Created by hp on 09-08-2020.
 */
import { connect } from 'react-redux';
import * as actionCreators from '../store/info/infoActions';
import React, { Component } from 'react';


class AccountsPage extends Component {
    componentDidMount() {
        this.props.getInfoAction();
    }
    render() {
        let { infoData } = this.props;
        return (
            <div className="container">
                <h1>Accounts Page {infoData && infoData}</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deleniti dignissimos in labore quae sunt.
                </p>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
  return {
    infoData: state.info.info_data,
  }
};

const mapDispatchToProps = function(dispatch) {
  return {
    getInfoAction: () => {
      dispatch(actionCreators.get_info_action());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);

