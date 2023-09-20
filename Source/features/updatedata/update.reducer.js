import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  profiledataupdateState: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SetprofiledataupdateState: (state, action) => {
      state.profiledataupdateState = action.payload;
    },
  },
});
export default UserSlice.reducer;
export const {SetprofiledataupdateState} = UserSlice.actions;
