import styled from '@emotion/styled';
import { Card } from 'react-bootstrap';

export const IssueContainer = styled.div`
    height: 8rem;
    transition: background-color 200ms ease-out;

    &:hover {
        background-color: aliceblue;
    }
`;

export const IssueName = styled(Card.Title)`
    padding: 0.5rem;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const IssueStyled = styled(Card)`
    transition: background-color 200ms ease-out;
    background-color: ${props => props.isdragging === 'true' ? '#d9edff' : '#fff'};
    box-shadow: ${props => props.isdragging === 'true' ? '0 0 5px 0px rgb(0 0 0 / 30%);' : '0 0 5px 0px rgb(0 0 0 / 0%)'};
`;