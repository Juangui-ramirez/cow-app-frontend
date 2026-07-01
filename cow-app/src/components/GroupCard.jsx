import PropTypes from "prop-types";
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { formatCOP } from "../utils/currency";
import { useLanguage } from "../context/LanguageContext";

export const GroupCard = ({ data, onDelete }) => {
  const { t } = useLanguage();

  const handleDelete = () => {
    onDelete(data.id);
  };

  return (
    <div className="flex gap-3 border-b-2 dark:border-gray-700 shadow-xl p-3">
      <img
        src={Logo}
        alt=""
        className="p-2 rounded-md w-[80px] mb-4"
        style={{ backgroundColor: data.color }}
      />
      <div className="flex flex-col justify-between mb-4">
        <h2 className="font-bold">{data.name}</h2>
        <p className="font-bold mb-2">
          {t("groupCard.totalOwe")} <span className="text-red-600">{formatCOP(data.totalowed)}</span>
        </p>
        <div className="flex gap-2">
          <Link to={`/groups/${data.id}`}>
            <Button text={t("groupCard.see")} onClick={() => {}} />
          </Link>
          <Button text={t("groupCard.leave")} onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};


GroupCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    totalowed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
