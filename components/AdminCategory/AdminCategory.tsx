import React from 'react'
import { Button, Paper } from '@mui/material'

import styles from './AdminCategory.module.scss'

export const AdminCategory = () => {
  return (
    <Paper elevation={3} className={styles.container}>
        <img width={'8%'} src='/category.png'></img>
        <p>Wasdfghfdsfsdfsdfdsfgh</p>
        <Button variant='contained'>Змінити</Button>
        <Button variant='contained' color='error'>Видалити</Button>
    </Paper>
  )
}
