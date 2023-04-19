import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

// Define a type for the slice state
interface UserState {
  value: any[];
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
    getUsersData: (state, action: PayloadAction<any[]>) => {
      state.value = action.payload;
    },
    updateUsersData: (state, action: PayloadAction<any[]>) => {
      state.value = action.payload;
    },
    clearUsersData: (state) => {
      state.value = [];
    },
  }
})

export const getUsersDataFunc = () => async (dispatch: (arg0: PayloadAction<any[]>) => void) => {
  try {
    const response = await axios.get(`https://randomuser.me/api/?results=10`);
    dispatch(getUsersData(response.data.results));
  } catch (error) {
    console.log(error);
  }
};

export const updateUsersDataFunc = (tempusers: any[]) => (dispatch: (arg0: PayloadAction<any[]>) => void) => {
  dispatch(updateUsersData(tempusers));
};

export const { getUsersData, clearUsersData, updateUsersData } = userSlice.actions;

export default userSlice.reducer;
