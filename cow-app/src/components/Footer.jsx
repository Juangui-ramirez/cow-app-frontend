import wwcLogo from "../assets/wwcmedellin.jpg";

export const Footer = () => {
  return (
    <footer className="flex justify-center">
      <img
        src={wwcLogo}
        alt="Logo Women Who Code Medellín"
        className=" w-20 py-5"
      />
    </footer>
  );
};
