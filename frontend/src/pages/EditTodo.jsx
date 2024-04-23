// EditTodo.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditTodo() {
  // eslint-disable-next-line no-unused-vars
  const [todo, setTodo] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const { id } = useParams();
//   const history = useHistory();

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const response = await fetch(`http://localhost:PORT/todos/${id}`);
      const data = await response.json();
      setTodo(data);
      setTitle(data.title);
      setDescription(data.description);
      setDueDate(data.dueDate);
      setCompleted(data.completed);
    } catch (error) {
      console.error('Error fetching todo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, dueDate, completed })
      });
      const data = await response.json();
      console.log('Todo updated:', data);
      history.push('/');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
      </form>
    </div>
  );
}

export default EditTodo;
