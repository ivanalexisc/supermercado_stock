"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function HomePage() {
  const { token, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (token) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }
  }, [token, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return null
}
