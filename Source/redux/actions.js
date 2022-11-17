export const SET_PHONE_NUMBER = 'SET_PHONE_NUMBER';
export const SET_OTP = 'SET_OTP';

export const setPhone = phone => dispatch => {
  dispatch({
    type: SET_PHONE_NUMBER,
    payload: phone,
  });
};
