import PropTypes from "prop-types";


export const Button = ({ text, onClick }) => {
  return (
    <button className="bg-brownppal text-white rounded-md h-auto max-w-[6rem] w-28" onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};