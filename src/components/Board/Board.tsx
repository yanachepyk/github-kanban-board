import Column from '../Column/Column';
import { BoardContainer, BoardStyled } from './Board.styled';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { saveRepository, updateIssuesLocation } from '../../redux/dashboard/dashboardSlice';

const Board = ({columns, columnsOrder}: any) => {
  const dispatch = useDispatch();

  const onDragEnd = ({ destination, source, draggableId }: any) => {
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = [...start.issuesIds];
      
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        issuesIds: newTaskIds.map(Number),
      };

      dispatch(updateIssuesLocation({
        ...columns,
        [newColumn.id]: newColumn,
      }));
    } else {
      const startTaskIds = [...start.issuesIds];
      const finishTaskIds = [...finish.issuesIds];
      
      startTaskIds.splice(source.index, 1);
      finishTaskIds.splice(destination.index, 0, draggableId);
  
      const newStart = {
        ...start,
        issuesIds: startTaskIds.map(Number),
      };
  
      const newFinish = {
        ...finish,
        issuesIds: finishTaskIds.map(Number),
      };
  
      dispatch(updateIssuesLocation({
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }));
    }

    dispatch(saveRepository())
  }

  return (
    <BoardStyled>
      <BoardContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {columnsOrder.map((columnId: any) => (
            <Column key={columnId} column={columns[columnId]} />
          ))}
        </DragDropContext>
      </BoardContainer>
    </BoardStyled>
  );
};

export default Board;
