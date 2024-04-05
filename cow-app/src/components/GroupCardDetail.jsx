import PropTypes from "prop-types";
import Logo from "../assets/Logo.svg";

export const GroupCardDetail = ({ data }) => {
  return (
    <>
      <div className="flex justify-around m-6 ">
        <button className="bg-brownppal text-white font-semibold w-[33%] h-8 rounded-md">New Bill</button>
        <button className="bg-brownppal text-white font-semibold w-[33%] h-8 rounded-md">New Friend</button>
      </div>

      <div className="flex m-4 gap-6 h-full max-h-28">
        <img
          src={Logo}
          alt=""
          className=" max-w-24  p-2 rounded-lg "
          style={{ backgroundColor: data.color }}
        />
        <div className="flex flex-col justify-between w-full ">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <p className="text-black font-bold">
            Your Total Owe: <span className="text-red-600">$12.000</span>
          </p>
          <button className="bg-brownppal text-white font-semibold w-[80%] max-w-[180px] h-10 rounded-md">
            Leave the group
          </button>
        </div>
      </div>
    </>
  );
};

GroupCardDetail.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};
