import PropTypes from "prop-types";
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";

export const GroupCard = ({ data, onDelete }) => {
  const handleDelete = () => {
    onDelete(data.id);
  };

  return (
    <>
      <img
        src={Logo}
        alt=""
        className="p-2 rounded-md w-[70px] mb-4"
        style={{ backgroundColor: data.color }}
      />
      <div className="flex flex-col justify-between mb-4">
        <h2 className="font-bold">{data.name}</h2>
        <p className="font-bold">
          You owe: <span className="text-red-600">$12.000</span>
        </p>
        <div className="flex gap-2">
          <Link to={`/groups/${data.id}`}>
            <button className="bg-brownppal text-white rounded-md h-auto max-w-[6rem] w-28">
              Edit
            </button>
          </Link>
          <button
            className="bg-brownppal text-white rounded-md h-auto max-w-[6rem] w-28"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

GroupCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
