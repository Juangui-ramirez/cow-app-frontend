import PropTypes from "prop-types";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { apiFetch } from "../utils/api";

const COLORS = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#14b8a6",
  "#67e8f9",
  "#4c1d95",
];

const getRandomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const Modal = ({ isOpen, closeModal }) => {
  const { t } = useLanguage();
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState(null);

  const handleCreateGroup = async () => {
    try {
      if (!groupName) {
        throw new Error(t("modal.error.nameRequired"));
      }

      const color = selectedColor || getRandomColor();

      const response = await apiFetch("groups", {
        method: "POST",
        body: { name: groupName, color },
      });

      if (!response.ok) {
        throw new Error(t("modal.error.nameInUse"));
      }

      handleCloseModal();
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

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded max-w-[25em] w-full mx-6 ">
        <div className="flex justify-end items-end">
          <button className="text-black dark:text-gray-100 font-bold" onClick={handleCloseModal}>
            X
          </button>
        </div>
        <h1 className="text-2xl text-[#36190D] dark:text-amarello font-bold mb-4 text-center">
          {t("modal.newGroup")}
        </h1>
        <input
          type="text"
          placeholder={t("modal.groupName")}
          className="border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md p-2 mb-4 w-full"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          maxLength={30}
        />

        <div className="grid grid-cols-4 gap-4 border border-gray-400 dark:border-gray-600 rounded-md p-6">
          {COLORS.map((color) => (
            <div
              key={color}
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
          onClick={handleCreateGroup}
        >
          {t("modal.createGroup")}
        </button>
        {error && <p className="text-red-500 font-bold text-lg">{error}</p>}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
