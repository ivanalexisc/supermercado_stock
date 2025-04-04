import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "20px", flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/configuracion" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
