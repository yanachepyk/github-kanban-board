import { Draggable } from 'react-beautiful-dnd';
import { IssueContainer, IssueStyled } from './Issue.styled';
import IssueHeader from './IssueHeader';
import IssueBody from './IssueBody';
import IssueFooter from './IssueFooter';

const Issue = ({ issue, index }: any) => {

  /**
   * Need to add placeholders on data loading to improve visual user experience
  */

  return (
    <Draggable draggableId={`${issue.id}`} index={index}>
      {(provided, snapshot) => (
        <IssueStyled
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          isdragging={`${snapshot.isDragging}`}
        >
          <IssueContainer>
            <IssueHeader
              title={issue.title}
              number={issue.number}
              url={issue.html_url}
            />
            <IssueBody labels={issue.labels} />
            <IssueFooter comments={issue.comments} assignee={issue.assignee} />
          </IssueContainer>
        </IssueStyled>
      )}
    </Draggable>
  );
};

export default Issue;
