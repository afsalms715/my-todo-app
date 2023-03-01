import {addDoc,getDocs,collection,query,orderBy} from '@firebase/firestore'
import {db} from '../firebase_setup/firebase'
import {set,ref} from '@firebase/database'
import {useState,useEffect} from 'react'
import dayjs from 'dayjs';
import { TextField,Stack,Button,CircularProgress} from '@mui/material'
import {DeadlinePicker, TodoComplited} from './'
import { Box } from '@mui/system'


const TodoForm = () => {
    const[TodoText,setTodoText]=useState('')
    const [deadline, setDeadline] =useState(dayjs(Date()));
    const[Todos,setTodos]=useState()
    const[isloading,setLoading]=useState(false)
    const ref=collection(db,'myTodos')
    const saveTodo=()=>{
        try{
            setLoading(true)
            set(ref,{todo:TodoText,deadline:Date(deadline).slice(0,24),isDone:false})
            addDoc(ref,{todo:TodoText,deadline:Date(deadline).slice(0,24),isDone:false}).then(()=>{
                console.log('saved')
                setLoading(false)
                setTodoText('')
                setDeadline(Date())
                readTodos()
            })    
        }catch(err){
            console.log(err)
        }
    }
    const readTodos=async ()=>{
        await getDocs(query(ref,orderBy('deadline','desc'))).then((data)=>{
            const values=data?.docs?.map((doc)=>({...doc?.data()}))
            setTodos([values?.map((data,id)=>({id:id+1,task:data?.todo,Deadline:data?.deadline}))])
        })
    }
    useEffect(()=>{
        readTodos();
    },[])
    console.log(Todos)
  return (
    <Box sx={{width:'100%',}}>
        <Stack direction={{xs:'column',sm:'row',}} sx={{gap:1,width:{xs:'98%',md:'70%'},marginX:'auto'}}>
            <TextField 
                label='Task'
                multiline
                maxRows={4}
                value={TodoText}
                sx={{width:{xs:'100%',md:'40%'}}}
                onChange={(e)=>setTodoText(e.target.value)}/>
            <DeadlinePicker deadline={deadline} setDeadline={setDeadline}/>
            <Button 
                variant='outlined' 
                size='large' 
                onClick={()=>{saveTodo()}}>
                    {isloading ?<div style={{diplay:'flex'}}><div className="spinner-border text-success spinner-border-sm" role="status">
                                </div>saving...</div>:'ADD'}
            </Button>
        </Stack>
        <Stack direction={{xs:'column',sm:'row'}} sx={{gap:1,width:{xs:'98%',md:'90%'},
            justifyContent:'space-between',marginX:'auto'}}>
             <Box sx={{width:'100%',}}>
                {Todos && <TodoComplited head={'Todos'} todos={Todos}/>}
            </Box> 
            <Box sx={{width:{xs:'100%',sm:'60%'},}}>  
                {Todos &&<TodoComplited head={'Complited'} todos={Todos}/>}
            </Box>
        </Stack>
    </Box>
  )
}

export default TodoForm