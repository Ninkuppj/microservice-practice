// import type { UserInitialState } from "@/types/user";
// import * as actions from "./user.actions";
// import { createSlice } from "@reduxjs/toolkit";

// const initialState: UserInitialState = {
//   user: null,
//   isLoading: false,
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     // Registration
//     builder
//       .addCase(actions.register.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(actions.register.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.isLoading = false;
//       })
//       .addCase(actions.register.rejected, (state) => {
//         state.isLoading = false;
//       });

//     // Login
//     builder
//       .addCase(actions.login.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(actions.login.fulfilled, (state: { user: any; isLoading: boolean; }, action: { payload: { user: any; }; }) => {
//         state.user = action.payload.user;
//         state.isLoading = false;
//       })
//       .addCase(actions.login.rejected, (state: { isLoading: boolean; }) => {
//         state.isLoading = false;
//       });

//     // Logout
//     builder
//       .addCase(actions.logout.pending, (state: { isLoading: boolean; }) => {
//         state.isLoading = true;
//       })
//       .addCase(actions.logout.fulfilled, (state: { user: null; isLoading: boolean; }) => {
//         state.user = null;
//         state.isLoading = false;
//       })
//       .addCase(actions.logout.rejected, (state: { isLoading: boolean; user: null; }) => {
//         state.isLoading = false;
//         state.user = null;
//       });

//     // Check auth
//     builder
//       .addCase(actions.checkAuth.pending, (state: { isLoading: boolean; }) => {
//         state.isLoading = true;
//       })
//       .addCase(actions.checkAuth.fulfilled, (state: { user: any; isLoading: boolean; }, action: { payload: { user: any; }; }) => {
//         state.user = action.payload.user;
//         state.isLoading = false;
//       })
//       .addCase(actions.checkAuth.rejected, (state: { isLoading: boolean; user: null; }) => {
//         state.isLoading = false;
//         state.user = null;
//       });
//   }
// });