"use client"

import type React from "react"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !token) {
      router.push("/login")
    }
  }, [token, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!token) {
    return null
  }

  return <>{children}</>
}
