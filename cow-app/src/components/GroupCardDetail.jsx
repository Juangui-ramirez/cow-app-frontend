import PropTypes from "prop-types";
import Logo from "../assets/Logo.svg";

export const GroupCardDetail = ({ data }) => {
  const { name, color, createdat } = data;
  const date = new Date(createdat);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <div className="flex m-6">
        <div className="flex justify-between gap-4 w-full">
          <button className="bg-brownppal text-white font-semibold w-28 h-8 rounded-md">
            New Bill
          </button>
          <button className="bg-brownppal text-white font-semibold w-28 h-8 rounded-md">
            New Friend
          </button>
          <button className="bg-brownppal text-white font-semibold w-28 h-8 rounded-md">
            Edit Group
          </button>
        </div>
      </div>

      <div className="flex m-4 gap-6 h-full max-h-28">
        <img
          src={Logo}
          alt=""
          className=" max-w-24  p-2 rounded-lg "
          style={{ backgroundColor: color }}
        />
        <div className="flex flex-col justify-between w-full ">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-black font-bold">
            Your Total Owe: <span className="text-red-600">$12.000</span>
          </p>
          <button className="bg-brownppal text-white font-semibold w-[80%] max-w-[180px] h-10 rounded-md">
            Leave the group
          </button>
        </div>
      </div>

      <h1 className="m-4 text-2xl font-bold text-amarello">
        Friends and Bills
      </h1>
      <p className="ml-6">{formattedDate}</p>
    </>
  );
};

GroupCardDetail.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    createdat: PropTypes.string.isRequired,
  }).isRequired,
};
