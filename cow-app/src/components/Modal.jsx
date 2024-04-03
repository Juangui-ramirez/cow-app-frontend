import PropTypes from "prop-types";
import { useState } from "react";

export const Modal = ({ isOpen, closeModal }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState(null);
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#14b8a6",
    "#67e8f9",
    "#4c1d95",
  ];

  const getRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const handleCreateGroup = async () => {
    try {
      if (!groupName) {
        throw new Error("Group name is required");
      }

      let colorToUse = selectedColor;
      if (!selectedColor) {
        colorToUse = getRandomColor();
        setSelectedColor(colorToUse);
      }

      const response = await fetch("http://localhost:3000/groups", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name: groupName, color: colorToUse }),
      });

      if (!response.ok) {
        throw new Error("Failed to create group (Name in use)");
      }

      const newGroup = await response.json();
      handleCloseModal();
      console.log("New group created:", newGroup);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseModal = () => {
    setGroupName("");
    setSelectedColor("");
    setError(null);
    closeModal();
  };

  const handleRandomColor = () => {
    setSelectedColor(getRandomColor());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-[80px] left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div
        className="bg-white p-8 rounded"
        style={{ marginTop: "-43vh", width: "90vw" }}
      >
        <div className="flex justify-end items-end">
          <button className=" text-black font-bold" onClick={handleCloseModal}>
            X
          </button>
        </div>
        <h1 className="text-2xl text-[#36190D] font-bold mb-4 text-center">
          New Group
        </h1>
        <input
          type="text"
          placeholder="Group Name"
          className="border border-gray-400 rounded-md p-2 mb-4 w-full"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          maxLength={30}
        />

        <div className="grid grid-cols-4 gap-4 border border-gray-400 rounded-md p-6">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-auto h-14 rounded-md cursor-pointer ${
                selectedColor === color ? "border-2 border-black" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() =>
                setSelectedColor((prevColor) =>
                  prevColor === color ? "" : color
                )
              }
            />
          ))}
        </div>
        <button
          className="bg-[#36190D] text-white font-medium rounded-md h-[40px] w-full flex justify-center items-center mt-4"
          onClick={() => {
            handleCreateGroup();
            handleRandomColor();
          }}
        >
          Create Group
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
