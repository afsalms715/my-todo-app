import './App.css';
import {Box} from '@mui/material' 
import {Login, Navbar,TodoForm} from './components'
import {DataProvider} from './context/DataProvider'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <DataProvider>
      <Box >
      <Navbar/>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/Todo' element={<TodoForm/>}/> 
          </Routes>
        </Router>
      </Box>
    </DataProvider>
  );
}

export default App;
