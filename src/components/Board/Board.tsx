import Colum from '../Column/Column';
import { BoardContainer, BoardStyled } from './Board.styled';

const Board = () => {
  return (
    <BoardStyled>
      <BoardContainer>
        <Colum />
        <Colum />
        <Colum />
      </BoardContainer>
    </BoardStyled>
  );
};
export default Board;
