import {useEffect, useState,Fragment}from 'react';
import {AppBar,Box,Toolbar,Typography,IconButton,
        MenuItem,Menu,ListItem,ListItemButton,
        ListItemText,Drawer} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Navbar() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const[drawerState,setDrawerState]=useState(false)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawelist=()=>{
    const bttns=['Profile','Account','Logout']
    return(
    <Box
        sx={{width:250}}
        role="presentation"
        onClick={()=>setDrawerState(false)}
        onKeyDown={()=>setDrawerState(false)}
        >
         {bttns.map((lists)=>(
            <ListItem  disablePadding>
                <ListItemButton>
                    <ListItemText>{lists}</ListItemText>
                </ListItemButton>
            </ListItem> 
         ))            
        }       
    </Box>
    )
  }

  const TemDrawer=()=>(
    <div>
    <Fragment>    
            <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2,display:{xs:'block',md:'none',} }}
                onClick={()=>setDrawerState(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor='left'
                open={drawerState}
                onClose={()=>setDrawerState(false)}
                >
                    {drawelist()}
            </Drawer>
    </Fragment>
    </div>
  )

  return (
    <Box sx={{ flexGrow: 1,position:'sticky',top:0,height:'35px'}}>
      <AppBar  sx={{height:'35px',}}>
        <Box sx={{mt:-2}}>
            <Toolbar >
            <TemDrawer/>
            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, }}>
                My Todo App
            </Typography>
            {auth && (
                <div>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
                </div>
            )}
          
            </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}
