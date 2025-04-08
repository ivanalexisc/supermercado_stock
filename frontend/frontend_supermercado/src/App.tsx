import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProduct from "./pages/CreateProduct"; 
import CargarVenta from "./pages/CargarVenta";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={
          isAuthenticated ? (
            <WithSidebar><Home /></WithSidebar>
          ) : <Navigate to="/login" />
        } />
        <Route path="/productos" element={
          isAuthenticated ? (
            <WithSidebar><Products /></WithSidebar>
          ) : <Navigate to="/login" />
        } />
        <Route path="/configuracion" element={
          isAuthenticated ? (
            <WithSidebar><Settings /></WithSidebar>
          ) : <Navigate to="/login" />
        } />
        <Route path="/edit/:id" element={
          isAuthenticated ? (
            <WithSidebar><EditProduct /></WithSidebar>
          ) : <Navigate to="/login" />
        } />
        <Route path="/crear-producto" element={
          isAuthenticated ? (
            <WithSidebar><CreateProduct /></WithSidebar>
          ) : <Navigate to="/login" />
        } />
        <Route path="/ventas/cargar" element={
          isAuthenticated ? (
            <WithSidebar><CargarVenta /></WithSidebar>
          ) : <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
};

const WithSidebar = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex" }}>
    <Sidebar />
    <div style={{ padding: "20px", flexGrow: 1 }}>{children}</div>
  </div>
);

export default App;
