import { useState } from "react";
import Logo from "../assets/Logo.svg";

export function GroupCard() {
  const [bgColor] = useState(() => {
    const randomColor = () => {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    };
    return randomColor();
  });

  return (
    <div className="flex gap-5 border-b-2 shadow-xl pl-3 mb-4">
      <img
        src={Logo}
        alt=""
        className="p-2 rounded-md w-[70px] mb-4"
        style={{ backgroundColor: bgColor }}
      />
      <div className="flex flex-col justify-between mb-4">
        <h2 className="font-bold">Grupo #1</h2>
        <p className="font-bold">
          You owe: <span className="text-red-600">$12.000</span>
        </p>
        <div className="flex gap-2">
          <button className="bg-[#36190D] text-white rounded-md h-auto w-[100px]">
            Edit
          </button>
          <button className="bg-[#36190D] text-white rounded-md h-auto w-[100px]">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
