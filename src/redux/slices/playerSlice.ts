import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  score: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload.name;
    },
    changeScore: (state, action) => {
      state.score = action.payload.score;
    },
  },
});

export const {changeName, changeScore} = playerSlice.actions;
export default playerSlice.reducer;
