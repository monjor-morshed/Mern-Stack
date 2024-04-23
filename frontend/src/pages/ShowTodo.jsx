// ShowTodo.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ShowTodo() {
  const [todo, setTodo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}`);
      const data = await response.json();
      setTodo(data);
    } catch (error) {
      console.error('Error fetching todo:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Todo Details</h1>
      <p>Title: {todo.title}</p>
      <p>Description: {todo.description}</p>
      <p>Due Date: {new Date(todo.dueDate).toLocaleDateString()}</p>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default ShowTodo;
