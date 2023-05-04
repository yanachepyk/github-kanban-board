import { useSelector } from 'react-redux';
import Board from '../../components/Board/Board';
import RepositoryInfo from '../../components/RepositoryInfo/RepositoryInfo';
import SearchForm from '../../components/SearchForm/SearchForm';
import { DashboardStyled, EmptyState } from './Dashboard.styled';
import {
  selectActiveBoard,
  selectColumnsOrder,
} from '../../redux/dashboard/selectors';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveRepository } from '../../redux/dashboard/dashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(selectActiveBoard);
  const columnsOrder = useSelector(selectColumnsOrder);

  let pageContent;

  if (activeBoard.identifier) {
    const { author, repository, columns } = activeBoard;

    pageContent = (
      <>
        <RepositoryInfo author={author} repository={repository} />
        <Board columns={columns} columnsOrder={columnsOrder} />
      </>
    );
  } else {
    pageContent = <EmptyState>No repository selected</EmptyState>;
  }

  useEffect(() => {
    return () => {
      dispatch(saveRepository());
    }
  }, [dispatch]);

  return (
    <DashboardStyled>
      <SearchForm boardId={activeBoard.identifier} />
      {pageContent}
    </DashboardStyled>
  );
};

export default Dashboard;
