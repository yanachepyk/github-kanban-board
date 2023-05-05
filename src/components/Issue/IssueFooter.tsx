import { BiComment } from 'react-icons/bi';
import { KandanTooltip } from '../../shared/components/Tooltip';
import {
  AssigneeImage,
  IssueAssigneeStyled,
  IssueComments,
  IssueFooterStyled,
  IssueLink,
} from './Issue.styled';
import { IssueAssignee } from '../../redux/dashboard/dashboard.model';

interface IssueFooterProps {
  comments: number;
  assignee: IssueAssignee;
}

const IssueFooter = ({ comments, assignee }: IssueFooterProps) => {
  return (
    <IssueFooterStyled>
      <KandanTooltip tooltip={`${comments} comments`}>
        <IssueComments>
          <BiComment />
          {comments}
        </IssueComments>
      </KandanTooltip>
      {assignee && (
        <IssueAssigneeStyled>
          <IssueLink
            href={assignee.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {assignee.login}
            <AssigneeImage src={assignee.avatar_url} alt={assignee.login} />
          </IssueLink>
        </IssueAssigneeStyled>
      )}
    </IssueFooterStyled>
  );
};

export default IssueFooter;
