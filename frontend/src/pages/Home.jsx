import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:4000/todos");
        const data = await response.json();

        if (response.ok) {
          setTodos(data);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleCompletionChange = async (id, completed) => {
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });
      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed } : todo
          )
        );
      } else {
        console.error("Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [newTodoDueDate, setNewTodoDueDate] = useState("");

  const handleNewTodoSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTodoTitle,
          description: newTodoDescription,
          dueDate: newTodoDueDate,
          completed: false,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setTodos([...todos, data]);
        setNewTodoTitle("");
        setNewTodoDescription("");
        setNewTodoDueDate("");
      } else {
        console.error("Failed to create new todo");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-1">
        <h3 className="ml-10 mt-6 p-3 text-4xl font-bold dark:gray-900">ToDO Lists</h3>
          
          {todos &&
            todos.map((todo) => (
              
              <div
                key={todo._id}
                className="ml-10 mt-6 max-w-sm p-3 bg-white border border-gray-200 rounded-md shadow-md"

              >
                <Link to={`/show/${todo._id}`}>
                  <h5 className="font-bold tracking-tight text-primary">
                    {todo.title}
                  </h5>
                </Link>
                <p className="text-gray-600 text-sm/[15px]">
                  <b>Due Date: </b>{" "}
                  {new Date(todo.dueDate).toLocaleDateString("en-US")}
                </p>
                <select
                  value={todo.completed ? "Completed" : "Incomplete"}
                  onChange={(e) =>
                    handleCompletionChange(
                      todo._id,
                      e.target.value === "Completed"
                    )
                  }
                >
                  <option value="Completed">Completed</option>
                  <option value="Incomplete">Incomplete</option>
                </select>
              </div>
            ))}
        </div>
        <div className="col-span-1">

          <form onSubmit={handleNewTodoSubmit} className="p-3">
            <h3 className="text-2xl font-bold dark:gray-900">Create New ToDo</h3>
            <input
              type="text"
              placeholder="Todo Title"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              className="mt-4 mr-2 inline-block px-3 py-2 border border-gray-300 rounded-md"
              
              required
            />
            <br />
            <textarea
              type="text"
              placeholder="Todo Description"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              className="mt-4 mr-2 inline-block px-3 py-2 border border-gray-300 rounded-md"
              
              
            />
            <br />
            <input
              type="date"
              value={newTodoDueDate}
              onChange={(e) => setNewTodoDueDate(e.target.value)}
              className="mt-4 mr-2 inline-block px-3 py-2 border border-gray-300 rounded-md"
              required
            />
            <br />
            <button
              type="submit"
              className="mt-4 inline-block dark:bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Create ToDo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
