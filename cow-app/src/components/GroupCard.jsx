import PropTypes from "prop-types";
import Logo from "../assets/Logo.svg";

export const GroupCard = ({ data }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((group) => (
          <div
            key={group.name}
            className="flex gap-5 border-b-2 shadow-xl pl-3 mb-4"
          >
            <img
              src={Logo}
              alt=""
              className="p-2 rounded-md w-[70px] mb-4"
              style={{ backgroundColor: group.color }}
            />
            <div className="flex flex-col justify-between mb-4">
              <h2 className="font-bold">{group.name}</h2>
              <p className="font-bold">
                You owe: <span className="text-red-600">$12.000</span>
              </p>
              <div className="flex gap-2">
                <button className="bg-brownppal text-white rounded-md h-auto max-w-[6rem] w-28">
                  Edit
                </button>
                <button className="bg-brownppal text-white rounded-md h-auto max-w-[6rem] w-28">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
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
};
