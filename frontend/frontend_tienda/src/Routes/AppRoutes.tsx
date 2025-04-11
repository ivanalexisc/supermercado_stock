

import { Routes, Route } from 'react-router-dom';
import Products from '../pages/Product';
import Home from "../pages/Home"


const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/Home" element={<Home/>} />
        
     </Routes>
   
    </div>
  )
}

export default AppRoutes
