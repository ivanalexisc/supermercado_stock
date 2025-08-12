"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { ChevronDown, ChevronRight } from "lucide-react"

interface Pedido {
  id: number
  cliente: string
  fecha: string
  estado: "pendiente" | "enviado" | "entregado" | "cancelado"
  total: number
  productos: {
    id: number
    nombre: string
    cantidad: number
    precio: number
  }[]
}

const estadoColors = {
  pendiente: "default",
  enviado: "secondary",
  entregado: "default",
  cancelado: "destructive",
} as const

const estadoLabels = {
  pendiente: "Pendiente",
  enviado: "Enviado",
  entregado: "Entregado",
  cancelado: "Cancelado",
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEstado, setSelectedEstado] = useState<string>("all")
  const [expandedPedidos, setExpandedPedidos] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { token } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchPedidos()
  }, [])

  const fetchPedidos = async () => {
    try {
      const response = await fetch("/api/pedidos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setPedidos(data)
      } else {
        // Datos simulados si la API no está disponible
        setPedidos([
          {
            id: 1,
            cliente: "Juan Pérez",
            fecha: "2024-01-15",
            estado: "pendiente",
            total: 1250.0,
            productos: [
              { id: 1, nombre: "Leche Entera", cantidad: 2, precio: 250.0 },
              { id: 2, nombre: "Pan Integral", cantidad: 1, precio: 750.0 },
            ],
          },
          {
            id: 2,
            cliente: "María García",
            fecha: "2024-01-14",
            estado: "enviado",
            total: 890.5,
            productos: [{ id: 3, nombre: "Yogurt Natural", cantidad: 3, precio: 890.5 }],
          },
          {
            id: 3,
            cliente: "Carlos López",
            fecha: "2024-01-13",
            estado: "entregado",
            total: 2100.0,
            productos: [
              { id: 1, nombre: "Leche Entera", cantidad: 4, precio: 1000.0 },
              { id: 4, nombre: "Queso Fresco", cantidad: 2, precio: 1100.0 },
            ],
          },
        ])
      }
    } catch (error) {
      // Datos simulados en caso de error
      setPedidos([
        {
          id: 1,
          cliente: "Juan Pérez",
          fecha: "2024-01-15",
          estado: "pendiente",
          total: 1250.0,
          productos: [
            { id: 1, nombre: "Leche Entera", cantidad: 2, precio: 250.0 },
            { id: 2, nombre: "Pan Integral", cantidad: 1, precio: 750.0 },
          ],
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleEstadoChange = async (pedidoId: number, nuevoEstado: string) => {
    try {
      const response = await fetch(`/api/pedidos/${pedidoId}/estado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      })

      if (response.ok) {
        setPedidos((prev) =>
          prev.map((pedido) => (pedido.id === pedidoId ? { ...pedido, estado: nuevoEstado as any } : pedido)),
        )
        toast({
          title: "Éxito",
          description: "Estado del pedido actualizado",
        })
      } else {
        throw new Error("Error al actualizar estado")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del pedido",
        variant: "destructive",
      })
    }
  }

  const togglePedidoExpansion = (pedidoId: number) => {
    setExpandedPedidos((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(pedidoId)) {
        newSet.delete(pedidoId)
      } else {
        newSet.add(pedidoId)
      }
      return newSet
    })
  }

  // Filter orders
  const filteredPedidos = pedidos.filter((pedido) => {
    return selectedEstado === "all" || pedido.estado === selectedEstado
  })

  // Pagination
  const totalPages = Math.ceil(filteredPedidos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPedidos = filteredPedidos.slice(startIndex, startIndex + itemsPerPage)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-600">Gestiona los pedidos de tus clientes</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedEstado} onValueChange={setSelectedEstado}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="enviado">Enviado</SelectItem>
                <SelectItem value="entregado">Entregado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos ({filteredPedidos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Acciones</TableHead>
                  <TableHead>Detalle</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPedidos.map((pedido) => (
                  <>
                    <TableRow key={pedido.id}>
                      <TableCell className="font-medium">#{pedido.id}</TableCell>
                      <TableCell>{pedido.cliente}</TableCell>
                      <TableCell>{new Date(pedido.fecha).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={estadoColors[pedido.estado]}>{estadoLabels[pedido.estado]}</Badge>
                      </TableCell>
                      <TableCell>${pedido.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Select value={pedido.estado} onValueChange={(value) => handleEstadoChange(pedido.id, value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pendiente">Pendiente</SelectItem>
                            <SelectItem value="enviado">Enviado</SelectItem>
                            <SelectItem value="entregado">Entregado</SelectItem>
                            <SelectItem value="cancelado">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => togglePedidoExpansion(pedido.id)}>
                          {expandedPedidos.has(pedido.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedPedidos.has(pedido.id) && (
                      <TableRow>
                        <TableCell colSpan={7} className="bg-gray-50">
                          <div className="p-4">
                            <h4 className="font-medium mb-2">Productos del pedido:</h4>
                            <div className="space-y-2">
                              {pedido.productos.map((producto) => (
                                <div key={producto.id} className="flex justify-between items-center text-sm">
                                  <span>{producto.nombre}</span>
                                  <span>Cantidad: {producto.cantidad}</span>
                                  <span>${producto.precio.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <span className="flex items-center px-4">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
