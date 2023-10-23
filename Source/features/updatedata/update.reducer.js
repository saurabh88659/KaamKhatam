import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  profiledataupdateState: null,
  cartId: null,
  profileImgeUrl: null,
  bookingId: null,
  totalServiceAmount: null,
  chatQuestion: [],
  chatAnswer: null,
  netAnswer: [],
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
    setTotalServiceAmount: (state, action) => {
      state.totalServiceAmount = action.payload;
    },
    setChatQuestion: (state, action) => {
      state.chatQuestion = action.payload;
    },
    setChatAnswer: (state, action) => {
      state.chatAnswer = action.payload;
    },
    setNetAnswer: (state, action) => {
      state.netAnswer.push(action.payload);
    },
  },
});
export default UserSlice.reducer;
export const {
  SetprofiledataupdateState,
  setCartId,
  setProfileImgeUrl,
  setBookingID,
  setTotalServiceAmount,
  setChatQuestion,
  setChatAnswer,
  setNetAnswer,
} = UserSlice.actions;
