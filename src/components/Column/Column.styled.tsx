import styled from '@emotion/styled';
import { Card } from 'react-bootstrap';

type IssuesListType = {
  draggingover: string;
};

export const ColumnContainer = styled(Card)`
  flex: 1 1 auto;
  min-width: 23rem;
  max-width: 25rem;
  height: fit-content;
  box-shadow: 0 0 5px 0px rgb(0 0 0 / 30%);
  border: 0;
  min-height: 200px;
  max-height: 100%;
`;

export const IssuesList = styled(Card.Body)<IssuesListType>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.25rem;
  user-select: none;
  transition: background-color 200ms ease-in;
  background-color: ${props =>
    props.draggingover === 'true' ? '#b6ddff' : '#efefef'};
  height: 100%;
  overflow: auto;
`;

export const ColumnName = styled(Card.Title)`
  margin: 0;
  text-align: center;
  padding: 0.5rem 1rem;
  background-color: #5c9eff;
`;
