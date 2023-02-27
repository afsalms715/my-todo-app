import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button ,Box} from '@mui/material'

const TodoComplited = () => {
    const columns=[
        {field:'task',headerName:'Task to Complite',flex:2},
        {field:'done',headerName:'Done',flex:1,renderCell:()=><Button variant='outlined' size='small' sx={{mr:1}}>DONE</Button>}
    ]
    const rows=[
        {id:1,task:'complite todo app'},
        {id:2,task:'complite todo app'},
        {id:3,task:'complite todo app'},
        {id:4,task:'complite todo app'},
        {id:5,task:'complite todo app'},
    ]
  return (
    <div style={{ height: 400,marginTop:'1rem', }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{width:{md:'100%'},}}
            />
     </div>                
  )
}

export default TodoComplited