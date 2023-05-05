import { Draggable } from 'react-beautiful-dnd';
import {
  AssigneeImage,
  IssueAssignee,
  IssueBody,
  IssueComments,
  IssueContainer,
  IssueFooter,
  IssueHeader,
  IssueLabel,
  IssueLink,
  IssueName,
  IssueStyled,
} from './Issue.styled';
import { KandanTooltip } from '../../shared/components/Tooltip';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/dashboard/selectors';
import { Card, Placeholder } from 'react-bootstrap';
import { BiComment } from 'react-icons/bi';
import { AiOutlineNumber } from 'react-icons/ai';
import { getTextColor } from '../../shared/utils/styles/dynamicTextColor';

const Issue = ({ issue, index }: any) => {
  const loading = useSelector(selectLoading);

  if (loading) {
    return (
      <IssueStyled>
        <IssueContainer>
          <Placeholder as={IssueName} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        </IssueContainer>
      </IssueStyled>
    );
  }

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
            <IssueHeader>
              <KandanTooltip tooltip={issue.title}>
                <IssueName>{issue.title}</IssueName>
              </KandanTooltip>
              <KandanTooltip tooltip={`#${issue.number}`}>
                <IssueLink
                  href={issue.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <AiOutlineNumber />
                </IssueLink>
              </KandanTooltip>
            </IssueHeader>
            <IssueBody>
              {issue.labels.map((label: any) =>
                label.description ? (
                  <KandanTooltip key={label.id} tooltip={label.description}>
                    <IssueLabel
                      bgColor={label.color}
                      textColor={getTextColor(label.color)}
                    >
                      {label.name}
                    </IssueLabel>
                  </KandanTooltip>
                ) : (
                  <IssueLabel
                    key={label.id}
                    bgColor={label.color}
                    textColor={getTextColor(label.color)}
                  >
                    {label.name}
                  </IssueLabel>
                )
              )}
            </IssueBody>
            <IssueFooter>
              <KandanTooltip tooltip={`${issue.comments} comments`}>
                <IssueComments>
                  <BiComment />
                  {issue.comments}
                </IssueComments>
              </KandanTooltip>
              {issue.assignee && (
                <IssueAssignee>
                  <IssueLink
                    href={issue.assignee.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {issue.assignee.login}
                    <AssigneeImage src={issue.assignee.avatar_url} alt={issue.assignee.login}/> 
                  </IssueLink>
                </IssueAssignee>
              )}
            </IssueFooter>
          </IssueContainer>
        </IssueStyled>
      )}
    </Draggable>
  );
};

export default Issue;
