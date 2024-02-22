import {AppBar,Box,Toolbar,Typography,IconButton} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useContext} from 'react'
import {TodoContext} from '../context/DataProvider'
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
  const {user,setUser}=useContext(TodoContext)
  
  return (
    <Box sx={{ flexGrow: 1,position:'sticky',top:0,height:'35px'}}>
      <AppBar  sx={{height:'35px',}}>
        <Box sx={{mt:-2}}>
            <Toolbar >
            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, }}>
                My Todo App
            </Typography>
            {user && (
                <div>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {user?<img alt='profile' src={user?.photoURL} style={{width:'25px',height:'25px',borderRadius:'50%'}}/>:<AccountCircle />}
                    <Typography variant='body2' sx={{ml:'4px'}}>{user?.displayName}{user.displayName? <LogoutIcon sx={{ml:1}} onClick={()=>{setUser(null)}}/>:'Login'}</Typography>
                </IconButton>
                
                </div>
            )}
          
            </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}
