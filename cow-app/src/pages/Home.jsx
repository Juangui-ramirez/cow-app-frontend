import { useLanguage } from "../context/LanguageContext";

export function Home() {
  const { t } = useLanguage();

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center text-amarello mb-8">{t("home.welcome")}</h1>
      <p className="text-brownppal dark:text-gray-100 font-semibold text-center mb-12">
        {t("home.subtitle")}
      </p>
      <div className="w-full max-w-lg">
        <p className="text-center text-lg font-bold text-brownppal dark:text-gray-100 mb-4">{t("home.exploreExpenses")}</p>
        <p className="text-center text-lg font-bold text-brownppal dark:text-gray-100">{t("home.createGroup")}</p>
      </div>
    </section>
  );
}
