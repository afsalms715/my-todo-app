import {database} from '../firebase_setup/firebase'
import {set,ref,onValue,push,remove} from 'firebase/database'
import {useState,useEffect,useRef} from 'react'
import dayjs from 'dayjs';
import { TextField,Stack,Button,CircularProgress} from '@mui/material'
import {DeadlinePicker, TodoComplited} from './'
import { Box } from '@mui/system'


const TodoForm = () => {
    const txtTodo=useRef(null)//for textfield focus
    const[TodoText,setTodoText]=useState('')//sate for todo text
    const [deadline, setDeadline] =useState(dayjs(Date()));//for deadline
    const[Todos,setTodos]=useState()//to store the todos read from rtdb
    const[isloading,setLoading]=useState(false)//saving data loading...

    const saveTodo=()=>{
        try{
            //save todo to rtdb 
            setLoading(true)
            set(push(ref(database,'sample')),{
                todo:TodoText,
                deadline:Date(deadline).slice(0,24),
                isDone:false}).then(()=>{
                    console.log('saved')
                    setLoading(false)
                    setTodoText('')
                    setDeadline(Date())
                    readTodos()
                    txtTodo.current.focus()
                })   
        }catch(err){
            console.log(err)
        }
    }

    const readTodos=async ()=>{
        //read todos from rtdb
        await onValue(ref(database,'sample'),(snapshot)=>{//onValue triger when data change
            const childNode=[]//save desc order todo//first is last insertion
            const values=[]
            snapshot.forEach((node)=>{
                  childNode.unshift(node)      
            })
            childNode.map((node)=>{
                values.push({key:node.key,val:node.val()})
            })
            console.log(values)
            setTodos([values?.map((data)=>({id:data.key,isDone:data?.val?.isDone,task:data?.val?.todo,Deadline:data?.val?.deadline}))])
        })
    }
    const changeStatus=(parms)=>{
        console.log(parms)
        try{
            set(ref(database,`sample/${parms.id}`),{
                todo:parms?.task,
                deadline:parms?.Deadline,
                isDone:true})
        }catch(err){
            console.log(err)
        }
    }
    const removeTodo=(parms)=>{
        remove(ref(database,`sample/${parms.id}`)).then(()=>{
            console.log('deleted')
        })
    }
    useEffect(()=>{
        readTodos();
    },[])
    //console.log(Todos[0])  
    Todos && console.log(Todos[0]?.filter(data=>data?.isDone==false))
  return (
    <Box sx={{width:'100%',}}>
        <Stack direction={{xs:'column',sm:'row',}} sx={{gap:1,width:{xs:'98%',md:'70%'},marginX:'auto'}}>
            <TextField 
                label='Task'
                inputRef={txtTodo}
                autoFocus
                multiline
                maxRows={4}
                value={TodoText}
                sx={{width:{xs:'100%',md:'40%'}}}
                onChange={(e)=>{setTodoText(e.target.value)}}
                onKeyDown={(e)=>{
                    if(e.key=='Enter'){
                        saveTodo()
                    }
                }}    
                    />
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
                {Todos && <TodoComplited head={'Todos'} changeStatus={changeStatus} todos={Todos[0]?.filter(data=>data?.isDone==false)}/>}
            </Box> 
            <Box sx={{width:{xs:'100%',sm:'60%'},}}>  
                {Todos &&<TodoComplited head={'Complited'} removeTodo={removeTodo} todos={Todos[0]?.filter(data=>data?.isDone==true)}/>}
            </Box>
        </Stack>
    </Box>
  )
}

export default TodoForm