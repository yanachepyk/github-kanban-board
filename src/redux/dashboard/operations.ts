import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.github.com';

export const fetchIssues = createAsyncThunk(
  'dashboard/fetchIssues',
  async ({author, repository}: FetchIssuesBody, thunkApi) => {
    try {
      console.log(author, repository); 
      const { data } = await axios.get(`/repos/${author}/${repository}/issues?state=all`);

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
      console.log(author); 
      const { data } = await axios.get(`/users/${author}`);

      return data;
    } catch (e) {
        thunkApi.rejectWithValue(e);
    }
  }
);

export const fetchRepository = createAsyncThunk(
  'dashboard/fetchRepository',
  async ({author, repository}: FetchIssuesBody, thunkApi) => {
    try {
      const { data } = await axios.get(`/repos/${author}/${repository}`);

      return data;
    } catch (e) {
        thunkApi.rejectWithValue(e);
    }
  }
);

export interface FetchIssuesAction {
    type: string;
    payload: FetchIssuesBody;
}

export interface FetchIssuesBody {
    author: string;
    repository: string;
}