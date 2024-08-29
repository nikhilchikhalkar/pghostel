import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Button, Tooltip} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


import BedRoundedIcon from '@mui/icons-material/BedRounded';

import {   Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HostelRooms = () => {
//   const [floorDetails, setFloorDetails] = useState([
//     { name: 'Ground Floor', rooms: 0 },
//     { name: 'First Floor', rooms: 0 },
//     { name: 'Second Floor', rooms: 0 },
//     { name: 'Third Floor', rooms: 0 },
//     { name: 'Fourth Floor', rooms: 2 },
//     { name: 'Fifth Floor', rooms: 4 }, // Fixed duplicate name
//   ]);
 const  floorDetails =[
    { room: 1, bed1:false , bed2:true, bed3:false, bed4:true},
    { room: 2,bed1:true , bed2:true, bed3:false, bed4:true },
    { room: 3,bed1:true , bed2:true, bed3:true, bed4:true },
    { room: 4, bed1:false , bed2:false, bed3:false, bed4:true},
    { room: 5,bed1:false , bed2:false, bed3:false, bed4:false},
    // {  room: 6, beds:1 }, // F
  ]

//   const [selectedFloor, setSelectedFloor] = useState('');
  // const [expandedroomDetails, setexpandedroomDetails] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const facilities = [
    { label: '3 times food', isToggled: false },
    { label: 'Wi-Fi', isToggled: true },
    { label: 'Lift', isToggled: false },
    { label: 'Drinking water (RO water)', isToggled: false },
    { label: 'Hot water', isToggled: false },
    { label: '24/7 water supply', isToggled: true },
    { label: 'Power supply', isToggled: false },
    { label: 'AC/Non AC', isToggled: false },
    { label: 'Lockers/ Racks', isToggled: false },
    { label: '24/7 CCTV surveillance', isToggled: true },
    { label: 'Fully furnished/ Not', isToggled: false },
    { label: 'Daily cleaning & housekeeping services', isToggled: true },
    { label: 'Washing machine', isToggled: false },
    { label: 'Security guard', isToggled: false },
    { label: 'Power backup', isToggled: false },
    { label: 'Bed, bedsheet, pillow', isToggled: false },
    { label: 'Laundry service', isToggled: false },
    { label: 'Study table', isToggled: false },
    { label: 'Biometric security', isToggled: true },
    { label: 'Shuttle facility', isToggled: false },
    { label: 'Tea (or) coffee machines', isToggled: false },
    { label: 'First aid kit', isToggled: true },
    { label: 'Table tennis kit', isToggled: false },
    { label: 'Gym', isToggled: true },
  ];
  

  const handleOpenDialog = (room) => {
    setSelectedRoom(room);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRoom(null);
  };

  // const handleExpandClick = (index) => {
  //   setexpandedroomDetails(expandedroomDetails === index ? null : index);
  // };

//   const handleChange = (event) => {
//     setSelectedFloor(event.target.value);
//   };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6">
            Number of Rooms: {floorDetails.length}
          </Typography>
          
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {floorDetails.map((floor, index) => (
              <Grid item xs={12} md={3} key={index}  >
                <Item style={{backgroundColor:"lightyellow"}}>

                            <typography>Rooom No :- {floor.room}</typography>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Tooltip title={floor.bed1 ? 'Bed Available': "Bed Not Available"}>
                    <BedRoundedIcon  sx={{fontSize:'2rem', color: floor.bed1 ? "green" : "red"}}/>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12} md={6}>
                             <Tooltip title={floor.bed2 ? 'Bed Available': "Bed Not Available"}>

                    <BedRoundedIcon sx={{fontSize:'2rem', color: floor.bed2 ? "green" : "red"}}/>
                             </Tooltip>
                        </Grid>
                        <Grid item xs={12} md={6}>
                             <Tooltip title={floor.bed3 ? 'Bed Available': "Bed Not Available"}>

                    <BedRoundedIcon sx={{fontSize:'2rem', color: floor.bed3 ? "green" : "red"}}/>
                             </Tooltip>
                        </Grid>
                        <Grid item xs={12} md={6}>
                             <Tooltip title={floor.bed4 ? 'Bed Available': "Bed Not Available"}>

                    <BedRoundedIcon sx={{fontSize:'2rem', color: floor.bed4 ? "green" : "red"}}/>
                             </Tooltip>
                        </Grid>
                    </Grid>
                    
                  {/* <Typography variant="subtitle1">{floor.name}</Typography> */}
                  {/* <Typography variant="body2">Rooms: {floor.room}</Typography> */}
                  <Button
                  sx={{ mt: 2,mb:1 , backgroundColor:'lightpink', color:'black' }}
                  onClick={() => handleOpenDialog(floor.room)}                
                >
                  Facilities
                </Button>
                </Item> 
                 
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>



        {/* Dialog for Facilities */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog}  fullWidth maxWidth="md">
        <DialogTitle>
          Room {selectedRoom} Facilities
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{overflowY:'auto'}}>
          <Typography variant="body1">
            {/* Replace with your actual facilities content */}
            {/* Facilities for Room {selectedRoom} */}
            <Box sx={{ padding: 2, backgroundColor: '#cfe8fc' }}>
            <Grid container spacing={2}>
                  {facilities.map((facility, index) => (
                <Grid item xs={12} sm={6} md={4}>
                    <Box key={index} display="flex" alignItems="center" mb={1}>
                      {facility.isToggled ? (
                        <CheckIcon sx={{ color: 'green', marginRight: 1 }} />
                      ) : (
                        <CloseIcon sx={{ color: 'red', marginRight: 1 }} />
                      )}
                      <Typography>{facility.label}</Typography>
                    </Box>
                </Grid>
                  ))}
            </Grid>
          </Box>
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default HostelRooms;
