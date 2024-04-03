import { GroupCard } from "../components/GroupCard";
import { useState, useEffect } from "react";
import { Modal } from "../components/Modal";

export function Groups() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/groups");
      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  return (
    <section className="p-8">
      <div className="flex justify-end">
        <button
          className="bg-brownppal text-white font-medium rounded-md h-[30px] w-[120px]"
          onClick={openModal}
        >
          New Group
        </button>
      </div>
      <div className="pb-8">
        <h2 className="font-bold">You owe</h2>
        <p className="text-red-600 font-bold text-2xl">$45.000</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <GroupCard data={groups.sort((a,b) => a.name.localeCompare(b.name))} />
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </section>
  );
}
