import { GroupCard } from "../components/GroupCard";
import { useState, useEffect } from "react";
import { Modal } from "../components/Modal";
import { formatCOP } from "../utils/currency";
import { useLanguage } from "../context/LanguageContext";
import { apiFetch } from "../utils/api";

export function Groups() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [youOwe, setYouOwe] = useState(0);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    fetchData();
    fetchSummary();
  };

  const fetchData = async () => {
    try {
      const response = await apiFetch("groups?sort=desc");
      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }
      setGroups(await response.json());
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await apiFetch("bills/summary");
      if (!response.ok) {
        throw new Error("Failed to fetch bills summary");
      }
      const data = await response.json();
      setYouOwe(data.youOwe);
    } catch (error) {
      console.error("Error fetching bills summary:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await apiFetch(`groups/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete group");
      }
      fetchData();
      fetchSummary();
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSummary();
  }, []);

  return (
    <section className="min-h-[75vh] p-4">
      <div className="flex justify-end">
        <button
          className="bg-brownppal text-white font-medium rounded-md h-[2em] w-[8em]"
          onClick={openModal}
        >
          {t("groups.newGroup")}
        </button>
      </div>
      <div className="pb-8 m-4">
        <h1 className="font-bold text-2xl">{t("groups.youOwe")}</h1>
        <p className="text-red-600 font-bold text-4xl">{formatCOP(youOwe)}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {groups.map((group) => (
          <div key={group.id} className="flex justify-center">
            <GroupCard data={group} onDelete={() => handleDelete(group.id)} />
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </section>
  );
}
