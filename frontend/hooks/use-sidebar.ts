"use client"
import { useEffect, useState } from "react"

const SIDEBAR_KEY = "sidebar-collapsed"

export function useSidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_KEY)
    setCollapsed(stored === "true")
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(SIDEBAR_KEY, String(collapsed))
    }
  }, [collapsed, hydrated])

  return { collapsed, setCollapsed, hydrated }
}
