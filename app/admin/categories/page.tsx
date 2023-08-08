"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/redux/store'
import { addNewCategory } from '@/redux/features/adminSlice'

import styles from './Categories.module.scss'
import { AdminCategory } from '@/components/AdminCategory/AdminCategory'

const Categories = () => {
  const isAddingNewCategory = useSelector((state: RootState) => state.admin.isAddingNewCategory)
  const dispatch = useDispatch()
  return (
    <>
      <header className={styles.header}>
        <button onClick={() => dispatch(addNewCategory())}>{isAddingNewCategory ? 'Зберегти' : 'Додати нову категорію'}</button>
        <input style={isAddingNewCategory ? {visibility: 'visible'} : {}} placeholder='Введіть назву нової категорії'></input>
        <label style={isAddingNewCategory ? {visibility: 'visible'} : {}} htmlFor='categoryImg'>Завантажити обкладинку</label>
        <input id='categoryImg' type='file'></input>
      </header>
      <main className={styles.main}>
        <AdminCategory/>
        <AdminCategory/>
        <AdminCategory/>
        <AdminCategory/>
        <AdminCategory/>
      </main>
    </>
  )
}

export default Categories