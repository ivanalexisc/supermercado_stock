"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, DollarSign, Users, TrendingUp } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface DashboardStats {
  productos: number
  stock: number
  ventas: number
  ventasHoy: number
  usuarios: number
}

// Datos simulados para el gráfico de ventas
const ventasData = [
  { mes: "Ene", ventas: 15000 },
  { mes: "Feb", ventas: 18000 },
  { mes: "Mar", ventas: 22000 },
  { mes: "Abr", ventas: 19000 },
  { mes: "May", ventas: 25000 },
  { mes: "Jun", ventas: 20300 },
]

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setStats(data)
        } else {
          // Datos simulados si la API no está disponible
          setStats({
            productos: 9,
            stock: 668,
            ventas: 20300,
            ventasHoy: 0,
            usuarios: 4,
          })
        }
      } catch (error) {
        // Datos simulados en caso de error
        setStats({
          productos: 9,
          stock: 668,
          ventas: 20300,
          ventasHoy: 0,
          usuarios: 4,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [token])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen de tu negocio</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.productos}</div>
            <p className="text-xs text-muted-foreground">Total de productos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Total</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.stock}</div>
            <p className="text-xs text-muted-foreground">Unidades en inventario</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.ventas?.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Ingresos acumulados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.ventasHoy?.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Ingresos del día</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.usuarios}</div>
            <p className="text-xs text-muted-foreground">Usuarios registrados</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Ventas por Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ventasData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Ventas"]} />
              <Bar dataKey="ventas" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
