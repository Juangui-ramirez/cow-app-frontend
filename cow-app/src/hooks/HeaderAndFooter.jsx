import { Header } from "../components/Header"; 
import { Footer } from "../components/Footer";
import PropTypes from "prop-types";

function HeaderAndFooter({ children }) {
    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    );
  }

  HeaderAndFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

  export default HeaderAndFooter

