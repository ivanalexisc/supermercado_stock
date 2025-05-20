import { useEffect, useState } from 'react';
import { Grid, CircularProgress, Box } from '@mui/material';
import StatCard from '../components/StarCard'; // ajustá el path si es necesario
import { ShoppingCart, Store, MonetizationOn, Today } from '@mui/icons-material';

type DashboardStats = {
  productos: number;
  stock: number;
  ventas: number;
  ventasHoy: number;
};

const Home = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  if (loading || !stats) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid >
          <StatCard
            title="Productos"
            value={stats.productos}
            icon={<Store />}
            color="#1976d2"
          />
        </Grid>
        <Grid >
          <StatCard
            title="Stock total"
            value={stats.stock}
            icon={<ShoppingCart />}
            color="#388e3c"
          />
        </Grid>
        <Grid >
          <StatCard
            title="Ventas Totales"
            value={`$${stats.ventas}`}
            icon={<MonetizationOn />}
            color="#f57c00"
          />
        </Grid>
        <Grid >
          <StatCard
            title="Ventas Hoy"
            value={`$${stats.ventasHoy}`}
            icon={<Today />}
            color="#d32f2f"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
