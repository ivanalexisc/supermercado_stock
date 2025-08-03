import { useEffect, useState } from 'react';
import { Grid, CircularProgress, Box, Fab, Typography, Paper, Avatar } from '@mui/material';
import StatCard from '../components/StarCard';
import { ShoppingCart, Store, MonetizationOn, Today, Add, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

type DashboardStats = {
  productos: number;
  stock: number;
  ventas: number;
  ventasHoy: number;
  usuarios: number;
};

const Home = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/dashboard/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener los datos del dashboard', err);
        setLoading(false);
      });
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
    <Box sx={{ p: 3, background: "#f5f6fa", minHeight: "100vh" }}>
      <Paper elevation={2} sx={{ p: 3, mb: 3, display: "flex", alignItems: "center", borderRadius: 3 }}>
        <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
          <Person />
        </Avatar>
        <div>
          <Typography variant="h5" fontWeight={700}>
            ¡Hola, {usuario?.nombre || 'usuario'}!
          </Typography>
          <Typography color="text.secondary" fontSize={16}>
            Resumen de tu supermercado
          </Typography>
        </div>
      </Paper>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
       
          <StatCard
            title="Productos"
            value={stats.productos}
            icon={<Store />}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Stock total"
            value={stats.stock}
            icon={<ShoppingCart />}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Ventas Totales"
            value={`$${stats.ventas}`}
            icon={<MonetizationOn />}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Ventas Hoy"
            value={`$${stats.ventasHoy}`}
            icon={<Today />}
            color="#1976d2"
          />
        </Grid>
       <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Clientes activos "
            value={`${stats.usuarios}`}
            icon={<Person />}
            color="#1976d2"
          />
        </Grid>
      </Grid>
      <Fab
        color="primary"
        aria-label="Agregar producto"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        onClick={() => navigate('/crear-producto')}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default Home;
