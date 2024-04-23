// DeleteTodo.jsx
import { useEffect,useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DeleteTodo() {
  const { id } = useParams();
//   const history = useHistory();
    const navigate = useNavigate();
  useEffect(() => {
    deleteTodo();
  }, []);
  const [todos, setTodos] = useState([]);
  const deleteTodo = async () => {
    try {
        await fetch(`http://localhost:4000/todos/${id}`, {
            method: 'DELETE'
          });
          setTodos(todos.filter(todo => todo._id !== id));
          navigate('/');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <p>Deleting Todo...</p>
    </div>
  );
}

export default DeleteTodo;
