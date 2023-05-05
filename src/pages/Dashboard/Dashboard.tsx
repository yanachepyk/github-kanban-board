import { useSelector } from 'react-redux';
import Board from '../../components/Board/Board';
import RepositoryInfo from '../../components/RepositoryInfo/RepositoryInfo';
import SearchForm from '../../components/SearchForm/SearchForm';
import { DashboardStyled, EmptyState } from './Dashboard.styled';
import {
  selectActiveBoard,
  selectColumnsOrder,
} from '../../redux/dashboard/selectors';

const Dashboard = () => {
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

  return (
    <DashboardStyled>
      <SearchForm />
      {pageContent}
    </DashboardStyled>
  );
};

export default Dashboard;
