// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import userService from "../../services/userService";

// export const fetchUser = createAsyncThunk(
//   "user/fetchUser",
//   async (params, { rejectWithValue }) => {
//     try {
//       const data = await userService.getUser();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   loading: false,
//   userList: [],
//   error: null,
// };

// const userSlice = createSlice({
//   name: "User Slice",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userList = action.payload;
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default userSlice.reducer;
