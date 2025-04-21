

import { Routes, Route } from 'react-router-dom';
import Products from '../pages/Product';
import Home from "../pages/Home"
import Producto from '../pages/Producto';
import Buscar from '../pages/Buscar';
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/buscar" element={<Buscar />} />
     </Routes>
   
    </div>
  )
}

export default AppRoutes
