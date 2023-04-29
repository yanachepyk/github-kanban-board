import Issue from '../Issue/Issue';
import { ColumnContainer, ColumnName, IssuesList } from './Column.styled';

const Colum = () => {
  return (
    <ColumnContainer>
      <ColumnName>In progress</ColumnName>
      <IssuesList>
        <Issue />
        <Issue />
        <Issue />
        <Issue />
      </IssuesList>
    </ColumnContainer>
  );
};
export default Colum;
