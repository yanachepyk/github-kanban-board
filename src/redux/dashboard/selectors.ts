import { KeyValueObject } from '../../shared/utils/models/keyValueObject.model';
import { KanbanBoardStore } from '../store';
import { Board, Issue } from './dashboard.model';

export const selectActiveBoard = (state: KanbanBoardStore): Board =>
  state.dashboard.activeBoard;
export const selectIssues = (state: KanbanBoardStore): KeyValueObject<Issue> =>
  state.dashboard.activeBoard.issues;
export const selectColumnsOrder = (state: KanbanBoardStore): string[] =>
  state.dashboard.columnsOrder;
