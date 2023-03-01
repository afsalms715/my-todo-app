import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button ,Box} from '@mui/material'

const TodoComplited = ({head,todos}) => {
    const columns=head=='Todos'?([
        {field:'task',headerName:head,flex:2},
        {field:'Deadline',headerName:'Deadline',flex:1},
        {field:'done',headerName:head=='Complited'?'Remove':'Done',flex:1,renderCell:()=><Button variant='outlined' color={head=='Complited'?'error':'primary'} size='small' sx={{mr:1}}>{head=='Todos'? 'DONE':'REMOVE'}</Button>}
    ]):
    ([
        {field:'task',headerName:head,flex:3},
        {field:'done',headerName:head=='Complited'?'Remove':'Done',flex:1,renderCell:()=><Button variant='outlined' color={head=='Complited'?'error':'primary'} size='small' sx={{mr:1}}>{head=='Todos'? 'DONE':'REMOVE'}</Button>}
    ])
  return (
    <div style={{ height: 400,marginTop:'1rem', }}>
        <DataGrid
            rows={todos[0]}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{width:{md:'100%'},}}
            />
     </div>                
  )
}

export default TodoComplited