import React from 'react';
import { Todo } from '../model';
import './styles.css';
import SingleTodo from './SingleTodo';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList = ({ todos, setTodos }: Props) => {
  return (
    <div className='container'>
      <div className='todos'>
        <span className="todos__heading">
          Active Tasks
        </span>
        {
          todos.map((todo) => (
            <SingleTodo todo={ todo }
            todos={ todos }
            key={ todo.id }
            setTodos={ setTodos }
            />
          ))
        }
      </div>
      <div className='todos todos--completed'>
      <span className="todos__heading--completed">
          Completed Tasks
        </span>
        {
          todos.map((todo) => (
            <SingleTodo todo={ todo }
            todos={ todos }
            key={ todo.id }
            setTodos={ setTodos }
            />
          ))
        }
      </div>
    </div>
  )
}

export default TodoList