import { useParams } from "react-router-dom";
import { GroupCardDetail } from "../components/GroupCardDetail";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const GroupDetails = () => {
  const { groupName } = useParams();
  const [group, setGroup] = useState([]);

  const fetchData = async (groupName) => {
    try {
      const token = sessionStorage.getItem("token"); // Obtén el token de sessionStorage
      const encodedGroupName = encodeURIComponent(groupName);
      const response = await fetch(`${API_URL}groups/${encodedGroupName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch group details");
      }

      const data = await response.json();
      setGroup(data);
    } catch (error) {
      console.error("Error fetching group details:", error);
    }
  };

  useEffect(() => {
    fetchData(groupName);
  }, [groupName]);

  return (
    <section className="min-h-[75vh]">
      <div className="grid grid-cols-1 gap-3">
        <GroupCardDetail data={group} />
      </div>
    </section>
  );
};