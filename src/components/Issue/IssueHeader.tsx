import { AiOutlineNumber } from 'react-icons/ai';
import { KandanTooltip } from '../../shared/components/Tooltip';
import { IssueHeaderStyled, IssueLink, IssueName } from './Issue.styled';

interface IssueHeaderProps {
  title: string;
  number: number;
  url: string;
}

const IssueHeader = ({ title, number, url }: IssueHeaderProps) => {
  return (
    <IssueHeaderStyled>
      <KandanTooltip tooltip={title}>
        <IssueName>{title}</IssueName>
      </KandanTooltip>
      <KandanTooltip tooltip={`#${number}`}>
        <IssueLink href={url} target="_blank" rel="noreferrer noopener">
          <AiOutlineNumber />
        </IssueLink>
      </KandanTooltip>
    </IssueHeaderStyled>
  );
};

export default IssueHeader;
