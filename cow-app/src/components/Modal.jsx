import PropTypes from "prop-types";
import { useState } from "react";

const Modal = ({ isOpen, closeModal }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
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

  const handleCreateGroup = () => {
    console.log(
      "Creating group with name:",
      groupName,
      "and color:",
      selectedColor
    );
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-[80px] left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div
        className="bg-white p-8 rounded"
        style={{ marginTop: "-43vh", width: "90vw" }}
      >
        <button
          className="absolute top-16 right-8 text-black font-bold rounded-full w-6 h-6 flex items-center justify-center"
          onClick={closeModal}
        >
          X
        </button>
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
                selectedColor === color ? "border-4 border-black" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <button
          className="bg-[#36190D] text-white font-medium rounded-md h-[40px] w-full flex justify-center items-center mt-4"
          onClick={handleCreateGroup}
        >
          Create Group
        </button>
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={closeModal}
        ></button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
