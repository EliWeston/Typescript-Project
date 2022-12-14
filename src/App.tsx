import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setcompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) {
      return;
    }
    setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
    setTodo("");
  };

  const onDragEnd = (result:DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId
      &&
      destination.index === source.index
    )
      return;

      let add,
      active = todos,
      completed = completedTodos
      console.log(source, destination);

      if(source.droppableId === 'TodoList') {
        add = active[ source.index ];
        active.splice(source.index, 1);
      } else {
        add = completed[ source.index ];
        completed.splice(source.index, 1);
      }

      if(destination.droppableId === 'TodoList') {
        active.splice(destination.index, 0, add);
      } else {
        completed.splice(destination.index, 0, add);
      }

      setcompletedTodos(completed);
      setTodos(active);
  }

  return (
    <DragDropContext onDragEnd={ onDragEnd }>
    <div className="App">
      <span className="heading mt-3">Task App</span>
      <InputField todo={ todo } setTodo={ setTodo } handleAdd={ handleAdd }/>
      <TodoList todos={ todos } setTodos = { setTodos }
      completedTodos={ completedTodos }
      setCompletedTodos={ setcompletedTodos }
      />
    </div>
    </DragDropContext>
  );
}

export default App;
