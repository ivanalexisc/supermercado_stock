import { useEffect, useState } from 'react';
import { Grid, CircularProgress, Box, Fab } from '@mui/material';
import StatCard from '../components/StarCard'; // ajustá el path si es necesario
import { ShoppingCart, Store, MonetizationOn, Today, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

type DashboardStats = {
  productos: number;
  stock: number;
  ventas: number;
  ventasHoy: number;
};

const Home = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/dashboard/stats') // cambiá el puerto si es necesario
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener los datos del dashboard', err);
        setLoading(false);
      });
    // Obtener usuario
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  if (loading || !stats) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={1}>
      <div className="dashboard-header">
        <h2>¡Hola, {usuario?.nombre || 'usuario'}!</h2>
        <p>Resumen de tu supermercado</p>
      </div>
      <div className="dashboard-grid">
        <StatCard
          title="Productos"
          value={stats.productos}
          icon={<Store />}
          color="#1976d2"
        />
        <StatCard
          title="Stock total"
          value={stats.stock}
          icon={<ShoppingCart />}
          color="#1976d2"
        />
        <StatCard
          title="Ventas Totales"
          value={`$${stats.ventas}`}
          icon={<MonetizationOn />}
          color="#1976d2"
        />
        <StatCard
          title="Ventas Hoy"
          value={`$${stats.ventasHoy}`}
          icon={<Today />}
          color="#1976d2"
        />
      </div>
      <Fab color="primary" aria-label="Agregar producto" className="fab-accion" onClick={() => navigate('/crear-producto')}>
        <Add />
      </Fab>
    </Box>
  );
};

export default Home;
