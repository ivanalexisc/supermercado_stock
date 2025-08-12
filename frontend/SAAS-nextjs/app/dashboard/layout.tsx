import type React from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import DashboardLayout from "@/components/Layout/DashboardLayout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}
