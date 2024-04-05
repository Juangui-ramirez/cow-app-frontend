import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Groups } from "./pages/Groups";
import { Bills } from "./pages/Bills";
import { Friends } from "./pages/Friends";
import { GroupDetails } from "./pages/GroupDetails";
import { Login } from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Login /> <Footer />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <HandF>
                <Home />
              </HandF>
            }
          />
          <Route
            path="/friends"
            element={
              <HandF>
                <Friends />
              </HandF>
            }
          />
          <Route
            path="/bills"
            element={
              <HandF>
                <Bills />
              </HandF>
            }
          />
          <Route
            path="/groups"
            element={
              <HandF>
                <Groups />
              </HandF>
            }
          />
          <Route
            path="/groups/:groupName"
            element={
              <HandF>
                <GroupDetails />
              </HandF>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function HandF({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

HandF.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
