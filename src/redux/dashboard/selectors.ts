// selectors go here
export const selectAuthor = (state: any) => state.dashboard.author;
export const selectRepository = (state: any) => state.dashboard.repository;
export const selectColumns = (state: any) => state.dashboard.columns;
export const selectIssues = (state: any) => state.dashboard.issues;
export const selectColumnsOrder = (state: any) => state.dashboard.columnsOrder; 