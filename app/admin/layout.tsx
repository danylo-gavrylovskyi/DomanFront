"use client"

import React from 'react'

import { Paper } from '@mui/material'

import styles from './AdminLayout.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setActiveCategory } from '@/redux/features/adminSlice'
import Link from 'next/link'

const AdminLayout = ({children}: {children: React.ReactNode}) => {
  const activeCategoryIndex = useSelector((state: RootState) => state.admin.activeCategoryIndex)
  const dispatch = useDispatch()

  return (
    <>
      <aside className={styles.menu}>
        <Link href='/'>
        <div className={styles.logo}><img width={'150px'} src='/logo.png'></img></div>
        </Link>
        <div className={styles.sections}>
          <Link href='/admin/products'>
          <section onClick={() => dispatch(setActiveCategory(0))} className={activeCategoryIndex === 0 ? styles.active : ''}>Товари</section>
          </Link>
          <Link href='/admin/categories'>
          <section onClick={() => dispatch(setActiveCategory(1))} className={activeCategoryIndex === 1 ? styles.active : ''}>Категорії</section>
          </Link>
          <Link href='/admin/banners'>
          <section onClick={() => dispatch(setActiveCategory(2))} className={activeCategoryIndex === 2 ? styles.active : ''}>Банери</section>
          </Link>
          <section onClick={() => dispatch(setActiveCategory(3))} className={activeCategoryIndex === 3 ? styles.active : ''}>Сторінки <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
<path d="M7 10L12 15L17 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg></section>
        </div>
      </aside>
      <Paper className={styles.paper} elevation={3}>{children}</Paper>
    </>
  )
}

export default AdminLayout