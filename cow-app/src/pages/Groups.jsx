import { GroupCard } from "../components/GroupCard";
import { useState, useEffect } from "react";
import { Modal } from "../components/Modal";

const API_URL = import.meta.env.VITE_API_URL;

export function Groups() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
    setEditingGroup(null); // Clear editing state
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
        `${API_URL}groups?sort=desc&userId=${userId}`,
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
      const response = await fetch(`${API_URL}groups/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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

  const handleSaveGroup = async (name, color) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:3000/groups", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, color }),
      });

      if (!response.ok) {
        throw new Error("Name in use");
      }

      fetchData();
      closeModal();
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  const handleUpdateGroup = async (id, name, color) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/groups/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, color }),
      });

      if (!response.ok) {
        throw new Error("Failed to update group");
      }

      fetchData();
      closeModal();
    } catch (error) {
      console.error("Failed to update group:", error);
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
          <div key={group.id} className="flex justify-center">
            <GroupCard
              data={group}
              onDelete={() => handleDelete(group.id)}
              onEdit={() => setEditingGroup(group)} // Set editing group
            />
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onSave={handleSaveGroup}
        onUpdate={handleUpdateGroup}
        isEditing={!!editingGroup}
        initialGroupName={editingGroup?.name}
        initialColor={editingGroup?.color}
      />
    </section>
  );
}
