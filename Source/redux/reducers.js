import {SET_PHONE_NUMBER} from './actions';

const initialState = {
  phone: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PHONE_NUMBER:
      return {...state, phone: action.payload};
    default:
      return state;
  }
}

export default userReducer;
