import React, { useEffect, useRef, useState } from "react";
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
    if (inputtext === " ") {
      return null;
    }
    const newtodo = {
      id: Date.now(),
      text: inputtext,
      iscomplete: false,
    };
    settodolist((prev) => [...prev, newtodo]);
    inputRef.current.value = "";
  };

  const deletetodo = (id) => {
    settodolist((prevtodos) => {
      return prevtodos.filter((todo) => todo.id !== id);
    });
  };
  const toggle = (id) => {
    settodolist((prevtodos) => {
      return prevtodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, iscomplete: !todo.iscomplete };
        }
        return todo;
      });
    });
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className=" flex item-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="icon" />
        <h1 className="text-3xl font-semibold">To-DO List</h1>
      </div>

      {/* inputtt */}

      <div className="flex items-center m-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-lg font-medium cursor-pointer"
        >
          ADD +{" "}
        </button>
      </div>

      {/* todo list */}

      <div>
        {todolist.map((item, index) => {
          return (
            <Todoitems
              key={index}
              text={item.text}
              id={item.id}
              iscomplete={item.iscomplete}
              deletetodo={deletetodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
