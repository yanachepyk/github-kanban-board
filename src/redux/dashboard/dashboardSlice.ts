import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthor, fetchIssues, fetchRepository } from './operations';

enum Columns {
  TODO = 'col-1',
  IN_PROGRESS = 'col-2',
  CLOSED = 'col-3'
}

const initialState: any = {
  loading: false,
  author: {
    url: null,
    username: ''
  },
  repository: {
    url: null,
    name: '',
    stars: 0
  },
  issues: {},
  columns: {
    [Columns.TODO]: {
      id: Columns.TODO,
      title: 'ToDo',
      issuesIds: [],
    },
    [Columns.IN_PROGRESS]: {
      id: Columns.IN_PROGRESS,
      title: 'In Progress',
      issuesIds: [],
    },
    [Columns.CLOSED]: {
      id: Columns.CLOSED,
      title: 'Done',
      issuesIds: [],
    },
  },
  columnsOrder: [Columns.TODO, Columns.IN_PROGRESS, Columns.CLOSED],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateIssuesLocation(state, action) {
      state.columns = action.payload;
    }
  },
  extraReducers: builder =>
    builder
      .addCase(fetchIssues.fulfilled, (state, action: any) => {
        action.payload.forEach((issue: any) => {
          /** Closed issues */
          if (issue.state === 'closed') {
            state.columns[Columns.CLOSED].issuesIds.push(issue.id);
          }

          /** In Progress issues */
          if (issue.assignees.length && issue.state !== 'closed') {
            state.columns[Columns.IN_PROGRESS].issuesIds.push(issue.id);
          }

          /** ToDo issues */
          if (!issue.assignees.length && issue.state === 'open') {
            state.columns[Columns.TODO].issuesIds.push(issue.id);
          }

          state.issues[issue.id] = issue;
        });

        state.loading = false;
      })
      .addCase(fetchIssues.pending, state => {
        state.loading = true;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchAuthor.fulfilled, (state, action: any) => {
        state.author.url = action.payload.html_url;
        state.author.username = action.payload.login;
        state.loading = false;
      })
      .addCase(fetchAuthor.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAuthor.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchRepository.fulfilled, (state, action: any) => {
        state.repository.url = action.payload.html_url;
        state.repository.name = action.payload.name;
        state.repository.stars = action.payload.stargazers_count;
        state.loading = false;
      })
      .addCase(fetchRepository.pending, state => {
        state.loading = true;
      })
      .addCase(fetchRepository.rejected, (state, action) => {
        state.loading = false;
      }),
});

export const { updateIssuesLocation } = dashboardSlice.actions;