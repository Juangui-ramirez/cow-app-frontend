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

  const fetchData = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/groups?sort=desc&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }

      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/groups/${id}`, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete group");
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="min-h-[75vh] p-4">
      <div className="flex justify-end">
        <button
          className="bg-brownppal text-white font-medium rounded-md h-[2em] w-[8em]"
          onClick={openModal}
        >
          New Group
        </button>
      </div>
      <div className="pb-8 m-4">
        <h1 className="font-bold text-2xl">You owe</h1>
        <p className="text-red-600 font-bold text-4xl">$45.000</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {groups.map((group) => (
          <div
            key={group.name}
            className="flex justify-center "
          >
            <GroupCard
              data={group}
              onDelete={() => handleDelete(group.id)}
            />
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </section>
  );
}

