import React from "react";
import tick from "../assets/tick.png";
import nottick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const Todoitems = ({ text, id, iscomplete, deletetodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2 p-2 sm:p-3 bg-gray-800 rounded-lg">
      <div
        onClick={() => toggle(id)}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img
          src={iscomplete ? tick : nottick}
          alt="tick"
          className="w-6 sm:w-7"
        />
        <p
          className={`text-white ml-4 text-[16px] sm:text-[18px] ${
            iscomplete ? "line-through text-gray-400" : ""
          }`}
        >
          {text}
        </p>
      </div>
      <img
        onClick={() => deletetodo(id)}
        src={delete_icon}
        alt="delete"
        className="w-4 sm:w-5 cursor-pointer transition-transform hover:scale-110"
      />
    </div>
  );
};

export default Todoitems;
