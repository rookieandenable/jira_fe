import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { fetchCount } from './apiHome';
import { MembersType, ProjectListType } from '../../types/http';
import api from '../../api';

export interface HomeStateType {
  value: number;
  status: 'idle' | 'loading' | 'failed';
  membersList: MembersType[];
  projectsList: ProjectListType[];
}

const initialState: HomeStateType = {
  value: 0,
  status: 'idle',
  membersList: [],
  projectsList: [],
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const getMembers = createAsyncThunk(
  'home/fetchMembers',
  async () => {
    const res = await api.getMembersList()
    return res
  }
)

export const getProjects = createAsyncThunk(
  'home/fetchProjects',
  async () => {
    const res = await api.getProjectList()
    return res
  }
)

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(incrementAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.membersList = action.payload.data
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projectsList = action.payload.data
      })
      // .addCase(incrementAsync.rejected, (state) => {
      //   state.status = 'failed';
      // });
  },
});

export const { increment, decrement, incrementByAmount } = homeSlice.actions;

export const homeState = (state: RootState) => state.home;

export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = homeState(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export default homeSlice.reducer;
