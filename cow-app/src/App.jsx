import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Groups } from "./pages/Groups";
import { Bills } from "./pages/Bills";
import { Friends } from "./pages/Friends";
import { GroupDetails } from "./pages/GroupDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:groupName" element={<GroupDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
