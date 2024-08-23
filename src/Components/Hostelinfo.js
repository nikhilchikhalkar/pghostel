import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import HostelRooms from './HostelRooms';
import { Button, TextField, Tooltip } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Hostelinfo = ({floorDetails}) => {
//   const [floorDetails, setFloorDetails] = useState([
//     { name: 'Ground Floor', rooms: 0 },
//     { name: 'First Floor', rooms: 0 },
//     { name: 'Second Floor', rooms: 0 },
//     { name: 'Third Floor', rooms: 0 },
//     { name: 'Fourth Floor', rooms: 2 },
//     { name: 'Fifth Floor', rooms: 4 }, // Fixed duplicate name
//   ]);
//  const  floorDetails =[
//     { name: 'Ground Floor', rooms: 0 },
//     { name: 'First Floor', rooms: 0 },
//     { name: 'Second Floor', rooms: 0 },
//     { name: 'Third Floor', rooms: 0 },
//     { name: 'Fourth Floor', rooms: 2 },
//     { name: 'Fifth Floor', rooms: 4 }, // F
//   ]



  const [selectedFloor, setSelectedFloor] = useState('');

  const handleChange = (event) => {
    setSelectedFloor(event.target.name);
    console.log("btn", event.target.name);
    
  };


  return (
    <Box >
    <Box sx={{ flexGrow: 1, margin:'1rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6">
            Number of Floors: {floorDetails.length}
          </Typography>
          {/* <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="floor-select-label">Select Floor</InputLabel>
            <Select
              labelId="floor-select-label"
              id="floor-select"
              value={selectedFloor}
              label="Select Floor"
              onChange={handleChange}
            >
              {floorDetails.map((floor, index) => (
                <MenuItem key={index} value={floor.name}>
                  {floor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
          {floorDetails.map((floor, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Tooltip
              title={floor.rooms === 0 ? 'Not Available' : `${floor.rooms} Rooms Available`}
              arrow
              placement="top"
            >
              <Item
                onClick={(e) => handleChange(e)}
                sx={{
                  backgroundColor: floor.rooms === 0 ? 'red' : 'green',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: floor.rooms === 0 ? 'darkred' : 'darkgreen',
                  },
                }}
              >
                <Typography variant="subtitle1">{floor.name}</Typography>
                <Typography variant="body2">Rooms: {floor.rooms}</Typography>
              </Item>
            </Tooltip>
          </Grid>
        ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>


    {/* select floor to show rooms */}
    <Box sx={{display: selectedFloor === "" ? "none" : "block" ,   }}>
      <HostelRooms/>
    </Box>
    </Box>
    
  );
};

export default Hostelinfo;
