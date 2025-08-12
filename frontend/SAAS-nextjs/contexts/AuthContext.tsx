"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  nombre: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, nombre: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    const savedUser = localStorage.getItem("usuario")

    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Credenciales inválidas")
      }

      const data = await response.json()

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      setToken(data.token)
      setUser(data.user)

      router.push("/dashboard")
    } catch (error) {
      throw error
    }
  }

  const register = async (email: string, password: string, nombre: string) => {
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, nombre }),
      })

      if (!response.ok) {
        throw new Error("Error al registrar usuario")
      }

      const data = await response.json()

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      setToken(data.token)
      setUser(data.user)

      router.push("/dashboard")
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
