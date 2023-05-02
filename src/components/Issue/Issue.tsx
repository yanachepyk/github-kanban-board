import { Draggable } from 'react-beautiful-dnd';
import { truncate } from '../../shared/utils/string/truncate';
import { IssueContainer, IssueName, IssueStyled } from './Issue.styled';
import { Card } from 'react-bootstrap';

const Issue = ({ issue, index }: any) => {
  return (
    <Draggable draggableId={`${issue.id}`} index={index}>
      {provided => (
        <IssueStyled {...provided.draggableProps} ref={provided.innerRef}>
          <IssueContainer>
            <IssueName {...provided.dragHandleProps}>{issue.title}</IssueName>
            <Card.Text title={issue.body}>
              {truncate(issue.body, 150)}
            </Card.Text>
          </IssueContainer>
        </IssueStyled>
      )}
    </Draggable>
  );
};

export default Issue;
