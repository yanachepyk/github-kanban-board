import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.github.com';

export const fetchIssues = createAsyncThunk(
  'dashboard/fetchIssues',
  async (
    { author, repository }: { author: string; repository: string },
    thunkApi
  ) => {
    try {
      /** Need to add pagination support to load next chunks */
      const { data } = await axios.get(
        `/repos/${author}/${repository}/issues?state=all&per_page=100`
      );

      return data;
    } catch (e) {
      thunkApi.rejectWithValue(e);
    }
  }
);

export const fetchAuthor = createAsyncThunk(
  'dashboard/fetchAuthor',
  async (author: string, thunkApi) => {
    try {
      const { data } = await axios.get(`/users/${author}`);

      return data;
    } catch (e) {
      thunkApi.rejectWithValue(e);
    }
  }
);

export const fetchRepository = createAsyncThunk(
  'dashboard/fetchRepository',
  async (
    { author, repository }: { author: string; repository: string },
    thunkApi
  ) => {
    try {
      const { data } = await axios.get(`/repos/${author}/${repository}`);

      return data;
    } catch (e) {
      thunkApi.rejectWithValue(e);
    }
  }
);
