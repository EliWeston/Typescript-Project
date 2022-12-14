import React from 'react';
import { Todo } from '../model';
import './styles.css';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
  return (
    <div className='container'>
      <Droppable droppableId="TodoList">
        {(provided, snapshot) => (
            <div className={ `todos ${snapshot.isDraggingOver? 'dragactive' : ''}` }
            ref={ provided.innerRef }
            { ...provided.droppableProps }
            >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => (
                <SingleTodo
                index={ index }
                todo={ todo }
                todos={ todos }
                key={ todo.id }
                setTodos={ setTodos }
                />
              ))}
              { provided.placeholder }
            </div>
          )}
      </Droppable>
      <Droppable droppableId="completedList">
        {(provided, snapshot) => (
          <div className={ `todos todos--completed ${snapshot.isDraggingOver? 'dragcompleted' : ''}` }
          ref={ provided.innerRef }
          { ...provided.droppableProps }>
          <span className="todos__heading--completed">Completed Tasks</span>
            {
              completedTodos.map((todo, index) => (
                <SingleTodo
                index={ index }
                todo={ todo }
                todos={ completedTodos }
                key={ todo.id }
                setTodos={ setCompletedTodos }
                />
              ))}
              { provided.placeholder }
          </div>

        )}
      </Droppable>
    </div>
  )
}

export default TodoList