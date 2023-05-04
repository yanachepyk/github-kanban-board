export const selectActiveBoard = (state: any) => state.dashboard.activeBoard;
export const selectIssues = (state: any) => state.dashboard.activeBoard.issues;
export const selectColumnsOrder = (state: any): string[] => state.dashboard.columnsOrder;