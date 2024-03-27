import { GroupCard } from "../components/GroupCard";
import { useState } from "react";
import Modal from "../components/Modal";

export function Groups() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="p-8">
      <div className="flex justify-end">
        <button className="bg-[#36190D] text-white font-medium rounded-md h-[30px] w-[120px]" onClick={openModal}>
          New Group
        </button>
      </div>
      <div className="pb-8">
        <h2 className="font-bold">You owe</h2>
        <p className="text-red-600 font-bold text-2xl">$45.000</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <GroupCard />
        
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </section>
  );
}
