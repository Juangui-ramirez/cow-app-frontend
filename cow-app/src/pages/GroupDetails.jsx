import { useParams, useNavigate } from "react-router-dom";
import { GroupCardDetail } from "../components/GroupCardDetail";
import { useState, useEffect } from "react";
import { apiFetch } from "../utils/api";

export const GroupDetails = () => {
  const { groupName } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [bills, setBills] = useState([]);

  const fetchGroup = async () => {
    try {
      const encodedGroupName = encodeURIComponent(groupName);
      const response = await apiFetch(`groups/${encodedGroupName}`);

      if (!response.ok) {
        throw new Error("Failed to fetch group details");
      }

      const data = await response.json();
      setGroup(data);
      return data;
    } catch (error) {
      console.error("Error fetching group details:", error);
      return null;
    }
  };

  const fetchMembers = async (groupId) => {
    try {
      const response = await apiFetch(`groups/${groupId}/members`);
      if (!response.ok) {
        throw new Error("Failed to fetch group members");
      }
      setMembers(await response.json());
    } catch (error) {
      console.error("Error fetching group members:", error);
    }
  };

  const fetchBills = async (groupId) => {
    try {
      const response = await apiFetch(`bills?groupId=${groupId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch bills");
      }
      setBills(await response.json());
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  const refreshDetails = async () => {
    const data = await fetchGroup();
    if (data?.id) {
      fetchMembers(data.id);
      fetchBills(data.id);
    }
  };

  useEffect(() => {
    refreshDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupName]);

  // Note: these two intentionally let errors propagate (no try/catch) so
  // GroupCardDetail's submit handlers can show the failure to the user.
  const handleAddBill = async (description, amount, splits) => {
    const response = await apiFetch("bills", {
      method: "POST",
      body: { groupId: group.id, description, amount, splits },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to create bill");
    }

    refreshDetails();
  };

  const handleAddMember = async (email) => {
    const response = await apiFetch(`groups/${group.id}/members`, {
      method: "POST",
      body: { email },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to add member");
    }

    refreshDetails();
  };

  const handleSettleSplit = async (splitId) => {
    try {
      const response = await apiFetch(`bills/splits/${splitId}/settle`, { method: "PUT" });

      if (!response.ok) {
        throw new Error("Failed to settle bill split");
      }

      refreshDetails();
    } catch (error) {
      console.error("Error settling bill split:", error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const response = await apiFetch(`groups/${group.id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete group");
      }

      navigate("/groups");
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  if (!group) {
    return <section className="min-h-[75vh]" />;
  }

  return (
    <section className="min-h-[75vh]">
      <div className="grid grid-cols-1 gap-3">
        <GroupCardDetail
          data={group}
          members={members}
          bills={bills}
          onAddBill={handleAddBill}
          onAddMember={handleAddMember}
          onSettleSplit={handleSettleSplit}
          onDeleteGroup={handleDeleteGroup}
        />
      </div>
    </section>
  );
};
