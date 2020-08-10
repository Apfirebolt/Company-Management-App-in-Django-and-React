import { connect } from 'react-redux';
import * as actionCreators from '../store/info/infoActions';
import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';


class AccountsRoutePage extends Component {
    componentDidMount() {
        this.props.getInfoAction();
    }
    render() {
    return (
        <div className="container">
            <p className="has-text-danger">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui reprehenderit tenetur totam
                voluptatibus! Autem consequuntur dolorum ea, eos facilis nulla!</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountsRoutePage);


