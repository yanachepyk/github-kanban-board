import styled from '@emotion/styled';
import { Card } from 'react-bootstrap';

export const ColumnContainer = styled(Card)`
  flex: 1 1 auto;
  min-width: 18rem;
  max-width: 22rem;
`;

export const IssuesList = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ColumnName = styled(Card.Title)`
  margin: 0;
  text-align: center;
  padding: 0.5rem 1rem;
  background-color: #5c9eff;
`;
