import * as actionTypes from './infoTypes';


// Set characters
export const set_info = ( value ) => {
  console.log('Setting value now..', value);
  return {
    type: actionTypes.SET_INFO,
    val: value
  };
};

// Fetch all characters
export const get_info_action = () => {
  return (dispatch) => {
    setTimeout(() => {
      console.log('Dispatching set info method...');
      dispatch(set_info('Amit'))
    }, 3000)
  }
}



