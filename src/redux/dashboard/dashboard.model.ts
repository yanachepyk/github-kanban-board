import { KeyValueObject } from '../../shared/utils/models/keyValueObject.model';

export enum Columns {
  TODO = 'col-1',
  IN_PROGRESS = 'col-2',
  CLOSED = 'col-3',
}

export interface RepositoryInformation {
  name: string;
  url: string;
  stars: number;
}

export interface AuthorInformation {
  username: string;
  url: string;
}

export interface Column {
  id: Columns.TODO | Columns.IN_PROGRESS | Columns.CLOSED;
  title: string;
  issuesIds: number[];
}

export interface IssueLabel {
  id: number;
  color: string;
  description: string;
  name: string;
}

export interface IssueAssignee {
  html_url: string;
  avatar_url: string;
  login: string;
}

export interface Issue {
  id: number;
  title: string;
  number: number;
  html_url: string;
  labels: IssueLabel[];
  comments: number;
  state: string;
  assignee: IssueAssignee;
  assignees: IssueAssignee[];
}

export interface Board {
  identifier: string;
  repository: RepositoryInformation;
  author: AuthorInformation;
  issues: KeyValueObject<Issue>;
  columns: KeyValueObject<Column>;
}

export interface DashboardState {
  repositories: KeyValueObject<Board>;
  activeBoard: Board;
  columnsOrder: string[];
}
