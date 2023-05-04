import styled from '@emotion/styled';
import { Card } from 'react-bootstrap';

export const ColumnContainer = styled(Card)`
  flex: 1 1 auto;
  min-width: 23rem;
  max-width: 25rem;
  height: fit-content;
`;

export const IssuesList = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.25rem;
  user-select: none;
  transition: background-color 200ms ease-in;
  background-color: ${props => props.dragingover === 'true' ? '#b6ddff' : '#ffffff'};
`;

export const ColumnName = styled(Card.Title)`
  margin: 0;
  text-align: center;
  padding: 0.5rem 1rem;
  background-color: #5c9eff;
`;
