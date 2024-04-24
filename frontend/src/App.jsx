// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from './components/Navbar'

import EditTodo from "./pages/EditTodo";
import ShowTodo from "./pages/ShowTodo";


const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/edit/:id" element={<EditTodo />} />
        <Route path="/show/:id" element={<ShowTodo />} />

      </Routes>
    </div>
  );
};

export default App;
