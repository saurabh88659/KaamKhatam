import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  profiledataupdateState: null,
  cartId: null,
  profileImgeUrl: null,
  bookingId: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SetprofiledataupdateState: (state, action) => {
      state.profiledataupdateState = action.payload;
    },
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setProfileImgeUrl: (state, action) => {
      state.profileImgeUrl = action.payload;
    },
    setBookingID: (state, action) => {
      state.bookingId = action.payload;
    },
  },
});
export default UserSlice.reducer;
export const {
  SetprofiledataupdateState,
  setCartId,
  setProfileImgeUrl,
  setBookingID,
} = UserSlice.actions;
