import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ToDo App</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
