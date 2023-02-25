import {useState} from 'react'
import { TextField,Stack} from '@mui/material'
import {DeadlinePicker} from './'


const TodoForm = () => {
    const[deadline,setDeadline]=useState('2014-08-18T21:11:54')
  return (
    <Stack sx={{direction:{xs:'column',sm:'row'}}}>
        <TextField 
            label='Task'
            multiline
            maxRows={4}/>
        <DeadlinePicker/>     
    </Stack>
  )
}

export default TodoForm