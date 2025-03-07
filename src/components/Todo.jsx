import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import todo_icon from "../assets/todo_icon.png";
import Todoitems from "./Todoitems";

const Todo = () => {
  const inputRef = useRef();
  const [todolist, settodolist] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const add = () => {
    const inputtext = inputRef.current.value.trim();
    if (inputtext === "") return;

    const newtodo = {
      id: Date.now(),
      text: inputtext,
      iscomplete: false,
    };

    settodolist((prev) => [...prev, newtodo]);
    inputRef.current.value = "";
  };

  const deletetodo = (id) => {
    settodolist((prevtodos) => prevtodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    settodolist((prevtodos) =>
      prevtodos.map((todo) =>
        todo.id === id ? { ...todo, iscomplete: !todo.iscomplete } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white py-10 px-5">
      {/* Navbar */}
      <nav className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">To-Do List</h1>
        <img className="w-10" src={todo_icon} alt="icon" />
      </nav>

      {/* Todo Container */}
      <div className="bg-gray-800 w-full max-w-2xl p-6 rounded-lg shadow-lg">
        {/* Input Section */}
        <div className="flex items-center bg-gray-700 rounded-lg p-3">
          <input
            ref={inputRef}
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-3"
            type="text"
            placeholder="Add your task..."
          />
          <button
            onClick={add}
            className="ml-3 px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg flex items-center"
          >
            <FiPlus size={20} /> <span className="ml-1 text-sm">Add</span>
          </button>
        </div>

        {/* Todo List */}
        <div className="mt-5 space-y-3">
          {todolist.map((item) => (
            <Todoitems
              key={item.id}
              text={item.text}
              id={item.id}
              iscomplete={item.iscomplete}
              deletetodo={deletetodo}
              toggle={toggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
