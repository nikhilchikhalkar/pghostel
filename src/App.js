import logo from './logo.svg';
import './App.css';
import HostelList from './Components/HostelList';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HostelManagement from './Pages/HostelManagement';
function App() {
  return (
    <div className="App">
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HostelList/>
      </LocalizationProvider> */}

      <HostelManagement/>
    </div>
  );
}

export default App;
