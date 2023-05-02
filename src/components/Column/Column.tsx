import { useSelector } from 'react-redux';
import Issue from '../Issue/Issue';
import { ColumnContainer, ColumnName, IssuesList } from './Column.styled';
import { selectIssues } from '../../redux/dashboard/selectors';
import { StrictModeDroppable } from '../../shared/utils/dnd/StrictModeDroppable';

const Column = ({ column }: any) => {
  const issues = useSelector(selectIssues);

  return (
    <ColumnContainer>
      <ColumnName>{column.title}</ColumnName>
      <StrictModeDroppable droppableId={column.id}>
        {provided => (
          <IssuesList ref={provided.innerRef} {...provided.droppableProps}>
            {column.issuesIds.map((id: number, index: number) => (
              <Issue key={id} issue={issues[id]} index={index} />
            ))}
            {provided.placeholder}
          </IssuesList>
        )}
      </StrictModeDroppable>
    </ColumnContainer>
  );
};
export default Column;
