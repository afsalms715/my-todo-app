import './App.css';
import {Box,Typography} from '@mui/material' 
import {Navbar,TodoBody} from './components'

function App() {
  return (
    <Box>
      <Navbar/>
      <TodoBody/>
    </Box>
  );
}

export default App;
