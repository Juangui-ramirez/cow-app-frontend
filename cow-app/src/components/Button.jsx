import PropTypes from "prop-types";


export const Button = ({ text, onClick }) => {
  return (
    <button className="bg-brownppal text-center hover:bg-amarello text-white font-semibold rounded min-h-7 min-w-28 sm:min-w-20" onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};