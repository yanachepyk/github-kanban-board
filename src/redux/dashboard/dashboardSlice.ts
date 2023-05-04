import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthor, fetchIssues, fetchRepository } from './operations';
import { createRepositoryId } from '../../shared/utils/string/repositoryIdentifier';

enum Columns {
  TODO = 'col-1',
  IN_PROGRESS = 'col-2',
  CLOSED = 'col-3'
}

const repositoryTemplate = {
  identifier: null,
  repository: {
    name: '',
    url: null,
    stars: 0,
  },
  author: {
    username: '',
    url: null,
  },
  issues: {},
  columns: {
    [Columns.TODO]: {
      id: Columns.TODO,
      title: 'Open',
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
  }
}

const initialState: any = {
  loading: false,
  repositories: {},
  activeBoard: repositoryTemplate,
  columnsOrder: [Columns.TODO, Columns.IN_PROGRESS, Columns.CLOSED],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateIssuesLocation(state, action) {
      state.activeBoard.columns = action.payload;
    },
    setActiveRepository(state, action) {
      const storedRepository = state.repositories[action.payload];

      if (storedRepository && storedRepository.identifier) {
        state.activeBoard = {
          ...storedRepository
        };
      } else {
        state.activeBoard = {
          ...repositoryTemplate
        };
      }
    },
    saveRepository(state) {
      if (state.activeBoard.identifier) {
        state.repositories[state.activeBoard.identifier] = state.activeBoard;
      }
    }
  },
  extraReducers: builder =>
    builder
      .addCase(fetchIssues.fulfilled, (state, action: any) => {
        action.payload.forEach((issue: any) => {
          /** Skip if already exist, as it might be already reordered and moved to another column */
          if (state.activeBoard.issues[issue.id]) {
            return;
          }

          /** Closed issues */
          if (issue.state === 'closed') {
            state.activeBoard.columns[Columns.CLOSED].issuesIds.push(issue.id);
          }

          /** In Progress issues */
          if (issue.assignees.length && issue.state !== 'closed') {
            state.activeBoard.columns[Columns.IN_PROGRESS].issuesIds.push(issue.id);
          }

          /** ToDo issues */
          if (!issue.assignees.length && issue.state === 'open') {
            state.activeBoard.columns[Columns.TODO].issuesIds.push(issue.id);
          }

          state.activeBoard.issues[issue.id] = issue;
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
        state.activeBoard.author.url = action.payload.html_url;
        state.activeBoard.author.username = action.payload.login;
        state.loading = false;
      })
      .addCase(fetchAuthor.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAuthor.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchRepository.fulfilled, (state, action: any) => {
        state.activeBoard.identifier = createRepositoryId(action.payload.owner.login, action.payload.name);
        state.activeBoard.repository.url = action.payload.html_url;
        state.activeBoard.repository.name = action.payload.name;
        state.activeBoard.repository.stars = action.payload.stargazers_count;
        state.loading = false;
      })
      .addCase(fetchRepository.pending, state => {
        state.loading = true;
      })
      .addCase(fetchRepository.rejected, (state, action) => {
        state.loading = false;
      }),
});

export const { updateIssuesLocation, setActiveRepository, saveRepository } = dashboardSlice.actions;