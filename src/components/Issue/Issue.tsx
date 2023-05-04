import { Draggable } from 'react-beautiful-dnd';
import { IssueContainer, IssueName, IssueStyled } from './Issue.styled';
import { KandanTooltip } from '../../shared/components/Tooltip';

const Issue = ({ issue, index }: any) => {
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
            <KandanTooltip
              key={issue.id}
              id={`${issue.id}`}
              tooltip={issue.title}
            >
              <IssueName>{issue.title}</IssueName>
            </KandanTooltip>
          </IssueContainer>
        </IssueStyled>
      )}
    </Draggable>
  );
};

export default Issue;
