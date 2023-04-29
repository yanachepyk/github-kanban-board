import { IssueContainer, IssueName, IssueStyled } from './Issue.styled';
import { Card } from 'react-bootstrap';

const Issue = () => {
  return (
    <IssueStyled>
      <IssueContainer>
        <IssueName>Card</IssueName>
        <Card.Text> IssueText</Card.Text>
      </IssueContainer>
    </IssueStyled>
  );
};

export default Issue;
