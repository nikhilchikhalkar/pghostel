import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, IconButton, Paper, styled } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BedRoundedIcon from '@mui/icons-material/BedRounded';

const Header = styled(Box)({
  textAlign: 'center',
  padding: '1rem',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #ccc',
});

const SectionTitle = styled(Box)({
  backgroundColor: '#FFDDC1',
  padding: '0.5rem',
  textAlign: 'center',
  fontWeight: 'bold',
  marginBottom: '1rem',
});

const CustomPaper = styled(Paper)({
  padding: '1rem',
  textAlign: 'center',
  backgroundColor: '#E0ECFF',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const HostelManagement = () => {
  // State to manage owners, floors, rooms, and beds
  const [formData, setFormData] = useState({
    hotelName: '',
    owners: [{ name: '', contact: '' }],
    floors: [{ name: ' Floor - 1', rooms: [] }],
  });

  const [errors, setErrors] = useState({ ownerError: '' });

  const addOwner = () => {
    if (formData.owners.length < 3) {
      setFormData({
        ...formData,
        owners: [...formData.owners, { name: '', contact: '' }],
      });
    }
  };

  const addFloor = () => {
    if (formData.floors.length < 5) {
      setFormData({
        ...formData,
        floors: [...formData.floors, { name: `Floor - ${formData.floors.length + 1}`, rooms: [] }],
      });
    }
  };

  const addRoom = (floorIndex) => {
    const updatedFloors = formData.floors.map((floor, index) => {
      if (index === floorIndex && floor.rooms.length < 5) {
        return { ...floor, rooms: [...floor.rooms, { name: `Room ${floor.rooms.length + 1}`, beds: [] }] };
      }
      return floor;
    });
    setFormData({ ...formData, floors: updatedFloors });
  };

  const addBed = (floorIndex, roomIndex) => {
    const updatedFloors = formData.floors.map((floor, fIndex) => {
      if (fIndex === floorIndex) {
        const updatedRooms = floor.rooms.map((room, rIndex) => {
          if (rIndex === roomIndex && room.beds.length < 6) {
            return { ...room, beds: [...room.beds, `Bed ${room.beds.length + 1}`] };
          }
          return room;
        });
        return { ...floor, rooms: updatedRooms };
      }
      return floor;
    });
    setFormData({ ...formData, floors: updatedFloors });
  };

  const handleOwnerChange = (index, field, value) => {
    const updatedOwners = formData.owners.map((owner, i) =>
      i === index ? { ...owner, [field]: value } : owner
    );
    setFormData({ ...formData, owners: updatedOwners });
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    // Check if at least one owner has both a name and contact number
    const hasValidOwner = formData.owners.some(
      (owner) => owner.name.trim() !== '' && owner.contact.trim() !== ''
    );

    if (!hasValidOwner) {
      setErrors({ ownerError: 'At least one owner with a valid contact number is required.' });
      return false;
    }

    // Clear errors if validation passes
    setErrors({ ownerError: '' });
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data before submission
    if (!validateForm()) {
      return;
    }

    // Submit or update the form data
    console.log('Updated Data:', formData);
    console.log('json  Data:', JSON.stringify(formData));
    // Implement actual submission logic here
  };

  return (
    <Box p={2} component="form" onSubmit={handleSubmit}>
      {/* Header Section */}
      <Header>
        <Typography variant="h5" fontWeight="bold">
          Management Overview
        </Typography>
      </Header>

      {/* Hotel Name */}
      <Box my={2}>
        <TextField
          fullWidth
          label="Name of Hotel"
          variant="outlined"
          sx={{ backgroundColor: '#E0ECFF' }}
          value={formData.hotelName}
          onChange={(e) => handleChange('hotelName', e.target.value)}
        />
      </Box>

      {/* Owners Section */}
      <Grid container spacing={2}>
        {formData.owners.map((owner, index) => (
          <Grid item xs={12} md={4} key={index}>
            <CustomPaper>
              <TextField
                fullWidth
                label={`Name of Owner ${index + 1}`}
                variant="outlined"
                size="small"
                value={owner.name}
                onChange={(e) => handleOwnerChange(index, 'name', e.target.value)}
              />
            </CustomPaper>
            <CustomPaper>
              <TextField
                fullWidth
                label={`Contact Number ${index + 1}`}
                variant="outlined"
                size="small"
                value={owner.contact}
                onChange={(e) => handleOwnerChange(index, 'contact', e.target.value)}
              />
              {index === formData.owners.length - 1 && formData.owners.length < 3 && (
                <IconButton color="primary" onClick={addOwner}>
                  <AddCircleIcon />
                </IconButton>
              )}
            </CustomPaper>
          </Grid>
        ))}
      </Grid>
      {/* Error Message */}
      {errors.ownerError && (
        <Typography color="error" variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
          {errors.ownerError}
        </Typography>
      )}

      {/* Floor Information Section */}
      <SectionTitle sx={{ marginTop: '1rem' }}>Floor Information</SectionTitle>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={2}>
          <CustomPaper>
            <Typography>Number of Floors: {formData.floors.length}</Typography>
            {formData.floors.length < 5 && (
              <IconButton color="primary" onClick={addFloor}>
                <AddCircleIcon />
              </IconButton>
            )}
          </CustomPaper>
        </Grid>
        <Grid item xs={12} md={10}>
            <Grid container spacing={2} >
   
          {/* Floors List */}
          {formData.floors.map((floor, floorIndex) => (
            <Grid item xs={12} md={3} key={floorIndex} >
            <Box key={floorIndex} my={2} p={2} border="1px solid #ccc" borderRadius="4px">
              <Typography variant="h6">{floor.name}</Typography>

              {/* Rooms Section */}
              {floor.rooms.map((room, roomIndex) => (
                <Box key={roomIndex} my={1} p={1} border="1px solid #ccc" borderRadius="4px">
                  <Typography variant="subtitle1">
                    {room.name} - Beds: {room.beds.length}
                  </Typography>
                  <Box display="flex" flexWrap="wrap">
                    <Grid container spacing={2}>
                      {room.beds.map((bed, bedIndex) => (
                        <Grid item xs={12} md={6} key={bedIndex}>
                          <Box
                            key={bedIndex}
                            p={1}
                            m={0.5}
                            border="1px solid #ccc"
                            borderRadius="4px"
                            backgroundColor="#E0ECFF"
                          >
                            <BedRoundedIcon sx={{ color: 'orange' }} />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  {room.beds.length < 6 && (
                    <IconButton color="primary" onClick={() => addBed(floorIndex, roomIndex)}>
                    <Button
                    startIcon={ <AddCircleIcon /> }
                    variant="outlined" sx={{color:'blue', size:'0.7rem'}}>
                      Add Bed
                    </Button>
                    </IconButton>
                  )}
                </Box>
              ))}
              {floor.rooms.length < 5 && (
                <Button
                  variant="outlined"
                  startIcon={<AddCircleIcon />}
                  onClick={() => addRoom(floorIndex)}
                  sx={{backgroundColor:'#FFDDC1'}}
                >
                  Add Room
                </Button>
              )}
            </Box>
             </Grid>
          ))}
           </Grid>
        </Grid>
      </Grid>

      {/* Update Button */}
      <Box mt={3} textAlign="end" marginRight='6rem'>
        <Button
          variant="contained"
          color="success"
          sx={{ padding: '0.5rem 2rem' }}
          type="submit"
        >
          Update the Page
        </Button>
      </Box>
    </Box>
  );
};

export default HostelManagement;
