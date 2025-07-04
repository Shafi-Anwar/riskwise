'use client'

import { useEffect } from "react"

export default function AutoDarkMode() {
  useEffect(() => {
    const hour = new Date().getHours()
    const isLate = hour >= 18 || hour <= 6

    if (isLate) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return null
}
