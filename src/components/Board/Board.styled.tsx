import styled from '@emotion/styled';
import { Card } from 'react-bootstrap';

export const Text = styled.p`
  font-size: 20px;
`;

export const BoardContainer = styled(Card.Body)`
    display: flex;
    gap: 2rem;
    min-height: 200px;
    flex: initial;
`;

export const BoardStyled = styled(Card)`
    flex: 1 0 auto;
    background-color: #d0e0f7;
`;
