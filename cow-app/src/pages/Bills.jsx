import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const Bills = () => {
  const [summary, setSummary] = useState({ youOwe: 0, youAreOwed: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`${API_URL}bills/summary`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bills summary");
        }

        setSummary(await response.json());
      } catch (error) {
        console.error("Error fetching bills summary:", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <section className="min-h-[75vh] p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mb-8">
        Ya sabe que las debe
      </h1>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="text-center">
          <p className="font-bold text-lg">You owe</p>
          <p className="text-red-600 font-bold text-4xl">
            ${summary.youOwe.toLocaleString("es-CO")}
          </p>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg">You are owed</p>
          <p className="text-greensucess font-bold text-4xl">
            ${summary.youAreOwed.toLocaleString("es-CO")}
          </p>
        </div>
      </div>
      <p className="text-center mt-8 max-w-md">
        Open a group and add a bill to split expenses with its participants.
      </p>
    </section>
  );
};
