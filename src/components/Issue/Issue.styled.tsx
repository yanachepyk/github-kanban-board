import styled from '@emotion/styled';
import { Card } from 'react-bootstrap';

type IssueLabelType = {
  bgColor: string;
  textColor: string;
};

type IssueStyledType = {
  isdragging?: string;
};

export const IssueContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 7rem;
  max-height: 10rem;
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: aliceblue;
  }
`;

export const IssueStyled = styled(Card)<IssueStyledType>`
  transition: background-color 200ms ease-out;
  /** props.isdragging passed like string due to react native node runtime warning */
  background-color: ${props =>
    props.isdragging === 'true' ? '#d9edff' : '#fff'};
  box-shadow: ${props =>
    props.isdragging === 'true' ? '0 0 5px 0px rgb(0 0 0 / 30%);' : 'none'};
`;

export const IssueName = styled(Card.Title)`
  font-size: 1rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IssueComments = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const IssueFooterStyled = styled(Card.Footer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  background-color: inherit;
  border: 0;
`;

export const IssueHeaderStyled = styled(Card.Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: inherit;
  border: 0;
  padding: 0.5rem;
  gap: 10px;
`;

export const IssueBodyStyled = styled(Card.Body)`
  display: flex;
  flex-wrap: wrap;
  padding: 0.25rem 0.5rem;
  overflow: hidden;
  gap: 0.5rem;
  max-height: 5.5rem;
`;

export const IssueLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: inherit;
`;

export const IssueLabelStyled = styled.div<IssueLabelType>`
  font-size: 0.75rem;
  background-color: ${({ bgColor }) => `#${bgColor}`};
  color: ${({ textColor }) => textColor};
  display: flex;
  border-radius: 0.75rem;
  height: 1.25rem;
  flex: 0 1 auto;
  padding: 0.25rem 0.5rem;
  align-items: center;
`;

export const IssueAssigneeStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const AssigneeImage = styled.img`
  width: 2rem;
  border-radius: 50%;
  aspect-ratio: 1;
`;
