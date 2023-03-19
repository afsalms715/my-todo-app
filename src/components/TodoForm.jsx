import {database} from '../firebase_setup/firebase'
import {set,ref,onValue,push,remove} from 'firebase/database'
import {useEffect,useRef} from 'react'
import { TextField,Stack,Button,CircularProgress} from '@mui/material'
import {DeadlinePicker, TodoComplited} from './'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add';
import {useContext} from 'react'
import { TodoContext } from '../context/DataProvider';
import {useNavigate} from 'react-router-dom'


const TodoForm = () => {
    const {user,setUser,TodoText,setTodoText,deadline,setDeadline,Todos,setTodos
        ,isloading,setLoading,empty,setEmpty}=useContext(TodoContext)
    const navigate=useNavigate()    
    useEffect(()=>{
        console.log(JSON.parse(sessionStorage.getItem('user')))
        if(!user && JSON.parse(sessionStorage.getItem('user'))==null){
            navigate('/')
        }else{
            setUser(JSON.parse(sessionStorage.getItem('user')))
        }
        console.log(user?.uid)
    },[])

    const txtTodo=useRef(null)//for textfield focus
    

    const saveTodo=()=>{
      if(TodoText){  
            try{
                //save todo to rtdb
                setEmpty(false) 
                setLoading(true)
                set(push(ref(database,`sample/${user.uid}`)),{
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
        }else{
            setEmpty(true)
        }
    }

    const readTodos=async ()=>{
        //read todos from rtdb
        await onValue(ref(database,`sample/${user.uid}`),(snapshot)=>{//onValue triger when data change
            const childNode=[]//save desc order todo//first is last insertion
            const values=[]
            snapshot.forEach((node)=>{
                  childNode.unshift(node)      
            })
            childNode.map((node)=>{
                values.push({key:node.key,val:node.val()})
            })
            setTodos([values?.map((data)=>({id:data.key,isDone:data?.val?.isDone,task:data?.val?.todo,Deadline:data?.val?.deadline}))])
        })
    }
    const changeStatus=(parms)=>{
        console.log(parms)
        try{
            set(ref(database,`sample/${user.uid}/${parms.id}`),{
                todo:parms?.task,
                deadline:parms?.Deadline,
                isDone:true})
        }catch(err){
            console.log(err)
        }
    }
    const removeTodo=(parms)=>{
        remove(ref(database,`sample/${user.uid}/${parms.id}`)).then(()=>{
            console.log('deleted')
        })
    }
    useEffect(()=>{
        if(TodoText){
            setEmpty(false)
        }
    },[TodoText])
    useEffect(()=>{
        if(user){
            readTodos();
        }else{
            navigate('/')
        }
    },[user])
  return (
    <Box sx={{pt:'2rem',display:'flex',justifyContent:'center',height:'94.5vh'}}>
    <Box sx={{width:'100%',}}>
        <Stack direction={{xs:'column',sm:'row',}} sx={{gap:1,width:{xs:'98%',md:'70%'},marginX:'auto'}}>
            <TextField
                error={empty} 
                label={empty==true?"please Enter Todo":"Task"}
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
                                </div>saving...</div>:<AddIcon/>}
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
    </Box>
  )
}

export default TodoForm