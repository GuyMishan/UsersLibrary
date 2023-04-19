import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Define a type for the slice state
interface UserState {
  value: []
}

// Define the initial state using that type
const initialState: UserState = {
  value: []
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getUsersData: (state, action) => {
      state.value = action.payload;
    },
    updateUsersData: (state, action) => {
      state.value = action.payload;
    },
    clearUsersData: (state) => {
      state.value = [];
    },
  }
})

export const getUsersDataFunc = () => async (dispatch: (arg0: { payload: any; type: "user/getUsersData" }) => void) => {
  await axios.get(`https://randomuser.me/api/?results=10`)
    .then((response: { data: any }) => {
      dispatch(getUsersData(response.data.results));
    })
    .catch((error: any) => {
      console.log(error);
    })
};

export const updateUsersDataFunc = (tempusers: any) => async (dispatch: (arg0: { payload: any; type: "user/getUsersData" }) => void) => {
  dispatch(getUsersData(tempusers));
};

export const { getUsersData, clearUsersData, updateUsersData } = userSlice.actions


export default userSlice.reducer