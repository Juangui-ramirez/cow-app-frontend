import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderAndFooter from "./hooks/HeaderAndFooter";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Groups } from "./pages/Groups";
import { Bills } from "./pages/Bills";
import { Friends } from "./pages/Friends";
import { GroupDetails } from "./pages/GroupDetails";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

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
            path="/register"
            element={
              <>
                <Register /> <Footer />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <HeaderAndFooter>
                <Home />
              </HeaderAndFooter>
            }
          />
          <Route
            path="/friends"
            element={
              <HeaderAndFooter>
                <Friends />
              </HeaderAndFooter>
            }
          />
          <Route
            path="/bills"
            element={
              <HeaderAndFooter>
                <Bills />
              </HeaderAndFooter>
            }
          />
          <Route
            path="/groups"
            element={
              <HeaderAndFooter>
                <Groups />
              </HeaderAndFooter>
            }
          />
          <Route
            path="/groups/:groupName"
            element={
              <HeaderAndFooter>
                <GroupDetails />
              </HeaderAndFooter>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
