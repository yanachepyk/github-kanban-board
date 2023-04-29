import Board from '../../components/Board/Board';
import RepositoryInfo from '../../components/RepositoryInfo/RepositoryInfo';
import SearchForm from '../../components/SearchForm/SearchForm';
import { DashboardStyled } from './Dashboard.styled';

const Dashboard = () => {
  return (
    <DashboardStyled>
      <SearchForm />
      <RepositoryInfo/>
      <Board />
    </DashboardStyled>
  );
};

export default Dashboard;
