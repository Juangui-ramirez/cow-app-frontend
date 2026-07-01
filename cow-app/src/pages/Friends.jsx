import { useState, useEffect } from "react";
import { Button } from "../components/Button";

const API_URL = import.meta.env.VITE_API_URL;

export const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [pending, setPending] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const authHeaders = () => ({
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  });

  const fetchFriends = async () => {
    try {
      const response = await fetch(`${API_URL}friends`, {
        headers: authHeaders(),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch friends");
      }
      setFriends(await response.json());
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const fetchPending = async () => {
    try {
      const response = await fetch(`${API_URL}friends?status=pending`, {
        headers: authHeaders(),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch friend requests");
      }
      setPending(await response.json());
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  const fetchData = () => {
    fetchFriends();
    fetchPending();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddFriend = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(`${API_URL}friends`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send friend request");
      }
      setEmail("");
      setMessage(data.message);
      fetchData();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`${API_URL}friends/${id}/accept`, {
        method: "PUT",
        headers: authHeaders(),
      });
      if (!response.ok) {
        throw new Error("Failed to accept friend request");
      }
      fetchData();
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`${API_URL}friends/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!response.ok) {
        throw new Error("Failed to remove friend request");
      }
      fetchData();
    } catch (error) {
      console.error("Error removing friend request:", error);
    }
  };

  return (
    <section className="min-h-[75vh] p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Friends</h1>

      <form
        onSubmit={handleAddFriend}
        className="flex flex-col sm:flex-row gap-3 justify-center mb-4"
      >
        <input
          type="email"
          placeholder="Friend's email"
          className="border rounded font-semibold text-brownsec py-2 px-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button text="Add Friend" onClick={() => {}} />
      </form>
      {message && (
        <p className="text-rederror font-semibold text-center mb-6">
          {message}
        </p>
      )}

      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">Friend requests</h2>
          <div className="flex flex-col gap-3">
            {pending.map((request) => (
              <div
                key={request.id}
                className="flex justify-between items-center border-b-2 shadow p-3"
              >
                <div>
                  <p className="font-bold">{request.friendName}</p>
                  <p className="text-sm">{request.friendEmail}</p>
                </div>
                <div className="flex gap-2">
                  <Button text="Accept" onClick={() => handleAccept(request.id)} />
                  <Button text="Reject" onClick={() => handleReject(request.id)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-3">Your friends</h2>
      {friends.length === 0 ? (
        <p className="text-center">Amiwis no hay</p>
      ) : (
        <div className="flex flex-col gap-3">
          {friends.map((friend) => (
            <div key={friend.id} className="flex justify-between items-center border-b-2 shadow p-3">
              <div>
                <p className="font-bold">{friend.friendName}</p>
                <p className="text-sm">{friend.friendEmail}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
