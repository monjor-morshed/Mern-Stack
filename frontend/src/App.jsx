// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from './components/Navbar'
// import CreateTodo from "./pages/CreateTodo";
import EditTodo from "./pages/EditTodo";
import ShowTodo from "./pages/ShowTodo";
// import ShowAllTodos from "./pages/ShowAllTodos";
// import DeleteTodo from "./pages/DeleteTodo";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/create" element={<CreateTodo />} /> */}
        <Route path="/edit/:id" element={<EditTodo />} />
        <Route path="/show/:id" element={<ShowTodo />} />
        {/* <Route path="/showall" element={<ShowAllTodos />} /> */}
        {/* <Route path="/delete/:id" element={<DeleteTodo />} /> */}
      </Routes>
    </div>
  );
};

export default App;
