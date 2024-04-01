import { useState, useEffect } from "react";
import Logo from "../assets/Logo.svg";

export function GroupCard() {
  const [bgColor] = useState(() => {
    const randomColor = () => {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    };
    return randomColor();
  });

  const [groups, setGroups] = useState([])

  useEffect(() => {
    const groups = fetch("http://localhost:3000/groups")
    groups.then(
      (res) => 
      res.json().then((data) => {
        setGroups(data)
      }),
      (err) => {
        console.info("request error", err);
      }
    )
  },[]);

  const groupName = groups.name
  console.log(groups)

  {
    groups.map(group => (<div key={group.name}>{group.name}</div>))
  }

  return (
    <div className="flex gap-5 border-b-2 shadow-xl pl-3 mb-4">
      <img
        src={Logo}
        alt=""
        className="p-2 rounded-md w-[70px] mb-4"
        style={{ backgroundColor: bgColor }}
      />
      <div className="flex flex-col justify-between mb-4">
        <h2 className="font-bold">{groupName}</h2>
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
