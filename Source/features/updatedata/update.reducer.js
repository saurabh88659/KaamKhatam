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
  verifiedCurrentNumberOtp: false,
  notification: [],
  notificationCount: 0,
  latitude: null,
  longitude: null,
  userData: null,
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
    setVerifiedCurrentNumberOtp: (state, action) => {
      state.verifiedCurrentNumberOtp = action.payload;
    },
    SetNotification: (state, action) => {
      state.notification = action.payload;
    },
    SetNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
    SetLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    SetLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    SetUserData: (state, action) => {
      state.userData = action.payload;
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
  setVerifiedCurrentNumberOtp,
  SetNotification,
  SetNotificationCount,
  SetLatitude,
  SetLongitude,
  SetUserData,
} = UserSlice.actions;
