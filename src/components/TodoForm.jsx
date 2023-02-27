import {useState} from 'react'
import { TextField,Stack,Button} from '@mui/material'
import {DeadlinePicker, TodoComplited} from './'
import { Box } from '@mui/system'


const TodoForm = () => {
    const[deadline,setDeadline]=useState('2014-08-18T21:11:54')
  return (
    <Box sx={{width:'70%'}}>
        <Stack direction={{xs:'column',sm:'row',}} sx={{gap:1,width:{xs:'100%',md:'100%'}}}>
            <TextField 
                label='Task'
                multiline
                maxRows={4}
                sx={{width:{xs:'100%',md:'40%'}}}/>
            <DeadlinePicker/>
            <Button variant='outlined' size='large'>ADD</Button>
        </Stack>
        <Stack direction={{xs:'column',sm:'row'}} sx={{gap:1,width:{xs:'100%',md:'100%'},
            justifyContent:'space-between'}}>
             <Box sx={{width:'100%',}}>
                <TodoComplited/>
            </Box> 
            <Box sx={{width:'100%',}}>  
                <TodoComplited/>
            </Box>
        </Stack>
    </Box>
  )
}

export default TodoForm