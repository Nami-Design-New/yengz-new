import { createSlice } from "@reduxjs/toolkit";

export const authedUser = createSlice({
  name: "authedUser",
  initialState: {
    user: null,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    logoutAction: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logoutAction } = authedUser.actions;
export default authedUser.reducer;
