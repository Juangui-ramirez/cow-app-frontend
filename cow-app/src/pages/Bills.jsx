import { useState, useEffect } from "react";
import { formatCOP } from "../utils/currency";
import { useLanguage } from "../context/LanguageContext";
import { apiFetch } from "../utils/api";

export const Bills = () => {
  const { t } = useLanguage();
  const [summary, setSummary] = useState({ youOwe: 0, youAreOwed: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await apiFetch("bills/summary");
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
        {t("bills.title")}
      </h1>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="text-center">
          <p className="font-bold text-lg">{t("bills.youOwe")}</p>
          <p className="text-red-600 font-bold text-4xl">
            {formatCOP(summary.youOwe)}
          </p>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg">{t("bills.youAreOwed")}</p>
          <p className="text-greensucess font-bold text-4xl">
            {formatCOP(summary.youAreOwed)}
          </p>
        </div>
      </div>
      <p className="text-center mt-8 max-w-md">
        {t("bills.hint")}
      </p>
    </section>
  );
};
