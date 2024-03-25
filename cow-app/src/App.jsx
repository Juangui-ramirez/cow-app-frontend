import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import {Home} from "./pages/Home"
import { Groups } from "./pages/Groups";

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/groups" element={<Groups />} />
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
