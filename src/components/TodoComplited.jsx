import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const TodoComplited = ({head,todos,changeStatus,removeTodo}) => {
    const columns=head==='Todos'?([
        {field:'task',headerName:head,flex:2},
        {field:'Deadline',headerName:'Deadline',flex:1},
        {field:'id',headerName:head==='Complited'?'Remove':'Done',flex:1,renderCell:(parms)=><Button variant='outlined' onClick={()=>changeStatus(parms.row)} color={head==='Complited'?'error':'primary'} size='small' sx={{mr:1}}>{'DONE'}</Button>}
    ]):
    ([
        {field:'task',headerName:head,flex:3},
        {field:'done',headerName:head==='Complited'?'Remove':'Done',flex:1,renderCell:(parms)=><Button variant='' onClick={()=>removeTodo(parms.row)} color={head==='Complited'?'error':'primary'} size='small' sx={{mr:1}}>{<HighlightOffIcon sx={{color:'red'}}/>}</Button>}
    ])
  return (
    <div style={{height:476,marginTop:'1rem', }}>
        <DataGrid
            rows={todos}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={7}
            rowsPerPageOptions={[5]}
            sx={{width:{md:'100%'},}}
            />
     </div>                
  )
}

export default TodoComplited