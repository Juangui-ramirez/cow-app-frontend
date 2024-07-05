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
import { Unauthorized } from "./pages/Unauthorized";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
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
          path="/unauthorized"
          element={
            <>
              <Unauthorized /> <Footer />
            </>
          }
        />
        <Route element={<PrivateRoute />}>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
