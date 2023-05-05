import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { fetchAuthor, fetchIssues, fetchRepository } from './operations';
import { createRepositoryId } from '../../shared/utils/string/repositoryIdentifier';
import {
  Board,
  Column,
  Columns,
  DashboardState,
  Issue,
} from './dashboard.model';
import { KeyValueObject } from '../../shared/utils/models/keyValueObject.model';

const boardTemplate: Board = {
  identifier: '',
  repository: {
    name: '',
    url: '',
    stars: 0,
  },
  author: {
    username: '',
    url: '',
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
  },
};

const initialState: DashboardState = {
  repositories: {},
  activeBoard: boardTemplate,
  columnsOrder: [Columns.TODO, Columns.IN_PROGRESS, Columns.CLOSED],
};

export const dashboardSlice: Slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateIssuesLocation(
      state: DashboardState,
      action: PayloadAction<KeyValueObject<Column>>
    ) {
      state.activeBoard.columns = action.payload;
    },
    setActiveRepository(state: DashboardState, action: PayloadAction<string>) {
      const storedRepository = state.repositories[action.payload];

      if (storedRepository && storedRepository.identifier) {
        state.activeBoard = {
          ...storedRepository,
        };
      } else {
        state.activeBoard = {
          ...boardTemplate,
        };
      }
    },
    saveRepository(state: DashboardState) {
      if (state.activeBoard.identifier) {
        state.repositories[state.activeBoard.identifier] = state.activeBoard;
      }
    },
  },
  extraReducers: builder =>
    builder
      .addCase(
        fetchIssues.fulfilled,
        (state: DashboardState, action: PayloadAction<Issue[]>) => {
          action.payload.forEach((issue: Issue) => {
            /** Skip if already exist, as it might be already reordered and moved to another column */
            if (state.activeBoard.issues[issue.id]) {
              return;
            }

            /** Closed issues */
            if (issue.state === 'closed') {
              state.activeBoard.columns[Columns.CLOSED].issuesIds.push(
                issue.id
              );
            }

            /** In Progress issues */
            if (issue.assignees.length && issue.state !== 'closed') {
              state.activeBoard.columns[Columns.IN_PROGRESS].issuesIds.push(
                issue.id
              );
            }

            /** ToDo issues */
            if (!issue.assignees.length && issue.state === 'open') {
              state.activeBoard.columns[Columns.TODO].issuesIds.push(issue.id);
            }

            state.activeBoard.issues[issue.id] = issue;
          });
        }
      )
      .addCase(
        fetchAuthor.fulfilled,
        (
          state: DashboardState,
          action: PayloadAction<{ html_url: string; login: string }>
        ) => {
          state.activeBoard.author.url = action.payload.html_url;
          state.activeBoard.author.username = action.payload.login;
        }
      )
      .addCase(
        fetchRepository.fulfilled,
        (state: DashboardState, action: PayloadAction<any>) => {
          state.activeBoard.identifier = createRepositoryId(
            action.payload.owner.login,
            action.payload.name
          );
          state.activeBoard.repository.url = action.payload.html_url;
          state.activeBoard.repository.name = action.payload.name;
          state.activeBoard.repository.stars = action.payload.stargazers_count;
        }
      ),
});

export const { updateIssuesLocation, setActiveRepository, saveRepository } =
  dashboardSlice.actions;
