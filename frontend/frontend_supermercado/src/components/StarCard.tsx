import { Card, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';

type StatCardProps = {
  title: string;
  value: number | string;
  icon?: ReactNode;
  color?: string;
};

const StatCard = ({ title, value, icon, color = '#1976d2' }: StatCardProps) => {
  return (
    <Card sx={{ minWidth: 200, flex: 1, backgroundColor: color, color: 'white' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        {icon && <div style={{ marginTop: '10px' }}>{icon}</div>}
      </CardContent>
    </Card>
  );
};

export default StatCard;
