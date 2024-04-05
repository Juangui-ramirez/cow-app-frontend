import { useParams } from "react-router-dom";
import { GroupCardDetail } from "../components/GroupCardDetail";
import { useState, useEffect } from "react";

export const GroupDetails = () => {
  const { groupName } = useParams();
  const [group, setGroup] = useState([]);

  const fetchData = async (groupName) => {
    try {
      const encodedGroupName = encodeURIComponent(groupName);
      const response = await fetch(`http://localhost:3000/groups/${encodedGroupName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }
      const data = await response.json();
      setGroup(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchData(groupName);
  }, [groupName]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-3">
        <GroupCardDetail data={group} />
      </div>
    </div>
  );
};
