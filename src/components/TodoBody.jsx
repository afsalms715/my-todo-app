import React from 'react'
import { Box } from '@mui/material'
import {TodoForm} from './'

const TodoBody = () => {
  return (
    <Box sx={{pt:'2rem',display:'flex',justifyContent:'center'}}>
       <TodoForm/> 
    </Box>
  )
}

export default TodoBody