// ShowTodo.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ShowTodo = () => {
  const [todo, setTodo] = useState({});
  const [editing, setEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`http://localhost:4000/todos/${id}`);
        const data = await response.json();
        setTodo(data);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };
    fetchTodo();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setUpdatedTodo({
      title: todo.title,
      description: todo.description,
      dueDate: new Date(todo.dueDate).toISOString().split("T")[0],
      completed: todo.completed,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo({
      ...updatedTodo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await fetch(`http://localhost:4000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      setEditing(false);
      setTodo(updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 items-center">
      <div className="ml-10 mt-6 max-w-sm p-3 bg-white border border-gray-200 rounded-md shadow-md ">
        {editing ? (
          <>
            <h3 className="text-lg font-bold">Edit ToDo</h3>
            <br />
            <input
              type="text"
              name="title"
              value={updatedTodo.title}
              onChange={handleChange}
              className="mt-4 mr-2 inline-block px-3 py-2 border border-gray-300 rounded-md"
            />
            <br />
            <textarea
              type="text"
              name="description"
              value={updatedTodo.description}
              onChange={handleChange}
              className="mt-4 mr-2 inline-block px-3 py-2 border border-gray-300 rounded-md"
            />
            <br />
            <input
              type="date"
              name="dueDate"
              value={updatedTodo.dueDate}
              onChange={handleChange}
              className="mt-4 mr-2 inline-block px-3 py-2 border border-gray-300 rounded-md"
            />
            <br />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold mt-4 inline-block px-3 py-2 rounded mr-2"
            >
              Submit
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">{todo.title}</h1>
            <p>Description: {todo.description}</p>
            <br />
            <p>Due Date: {new Date(todo.dueDate).toLocaleDateString("en-US")}</p>
            <br />
            <p>Completed: {todo.completed ? "Yes" : "No"}</p>
            <br />
            <button
              onClick={handleEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShowTodo;
