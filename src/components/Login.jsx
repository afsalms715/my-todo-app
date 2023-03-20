import {useEffect,} from 'react'
import {useNavigate} from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import {useContext} from 'react'
import { TodoContext } from '../context/DataProvider';
import {Box} from '@mui/material'

const Login = () => {
    const {user,registerWithGoogle}=useContext(TodoContext)
    const navigate=useNavigate()
    
    useEffect(()=>{
        console.log(user)
        if(user){
            navigate('/Todo')
        }
        else
            navigate('/')
    },[user])
  return (
    <div className='login-bg'>
        <Box className='login-box' sx={{background:'#fff',
        margin:'auto',
        height:'50vh',
        width:{xs:'95vw',md:'50vw'},
        borderRadius:'20px',
        boxShadow:'2px 2px'
    }}      >
            <div style={{display:'flex',justifyContent:'center',marginTop:'3rem'}}>
                <h1 style={{}}>Login</h1> 
            </div> 
            <div className='google-login' onClick={registerWithGoogle}>
                <h6> using {<GoogleIcon sx={{color:'#1976d2'}}/>}oogle account</h6>          
            </div>     
        </Box>
    </div>
  )
}

export default Login