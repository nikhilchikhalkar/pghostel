
import './App.css';
import HostelList from './Components/HostelList';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HostelManagement from './Pages/HostelManagement';
import InventoryManagement from './Pages/InventoryManagement';
import MenuSystem from './Pages/MenuSystem';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<InventoryManagement/>}  />
        <Route path='/menu' element={<MenuSystem/>}  />
        <Route path='/hotelmanagement' element={<HostelManagement/>}  />
        <Route path='/hotel-list' element={<LocalizationProvider dateAdapter={AdapterDayjs}>
      <HostelList/>
      </LocalizationProvider>
}  />
      </Routes>
      </BrowserRouter>
      
      {/* <HostelManagement/> */}
      {/* <MenuSystem/> */}
    </div>
  );
}

export default App;
