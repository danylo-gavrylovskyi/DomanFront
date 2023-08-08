'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import { Header } from '@/modules/Header/Header'

export const LayoutProvider = () => {
    const pathname = usePathname()
  return (
    <>{!pathname.includes('admin') && <Header/>}</>
  )
}
