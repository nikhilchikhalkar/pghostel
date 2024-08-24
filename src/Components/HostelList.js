import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Collapse,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  TextField,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Hostelinfo from './Hostelinfo';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


const HostelList = () => {
  const [expandedHostel, setExpandedHostel] = useState(null);

  const hostelData = [
    {
      name: 'Bhavani Boys Hostel',
      rating: 3.5,
      location: 'Indian Airlines Colony Begumpet, Hyderabad',
      tags: ['Hostels', 'Hostels For Men'],
      phone: '08792508973',
      enquiries: 394,
      image: 'https://images.unsplash.com/photo-1557222110-ca841d4b0dc8?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      floors: 5,
      totalavailableRooms: 12,
      floorDetails: [
        { name: 'Ground Floor', rooms: 4 },
        { name: 'First Floor', rooms: 1 },
        { name: 'Second Floor', rooms: 1 },
        { name: 'Third Floor', rooms: 0 },
        { name: 'Fourth Floor', rooms: 2 },
        { name: 'Fifth Floor', rooms: 4 },
      ],
    },
    {
      name: 'Dwarkamai Exotic Womens Pg',
      rating: 4.4,
      location: 'Begumpet Prakash Nagar, Hyderabad',
      tags: ['Hostels', 'Hostels For Women'],
      phone: '08971559301',
      enquiries: 450,
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      floors: 4,
      totalavailableRooms: 8,
      floorDetails: [
        { name: 'Ground Floor', rooms: 0 },
        { name: 'First Floor', rooms: 0 },
        { name: 'Second Floor', rooms: 0 },
        { name: 'Third Floor', rooms: 0 },
        { name: 'Fourth Floor', rooms: 2 },
      ],
    },
    {
      name: 'Srinivas Girls Hostel',
      rating: 4.0,
      location: 'Kukatpally, Hyderabad',
      tags: ['Hostels', 'Hostels For Women'],
      phone: '09988877666',
      enquiries: 245,
      image: 'https://images.unsplash.com/photo-1564155004-8fcf91eaa8d0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      floors: 4,
      totalavailableRooms: 20,
      floorDetails: [
        { name: 'Ground Floor', rooms: 5 },
        { name: 'First Floor', rooms: 5 },
        { name: 'Second Floor', rooms: 5 },
        { name: 'Third Floor', rooms: 5 },
      ],
    },
    {
      name: 'Madhavi Hostel',
      rating: 3.8,
      location: 'Secunderabad, Hyderabad',
      tags: ['Hostels', 'Budget Hostels'],
      phone: '08765432109',
      enquiries: 178,
      image: 'https://images.unsplash.com/photo-1558495660-8638b9a1d6b5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      floors: 3,
      totalavailableRooms: 15,
      floorDetails: [
        { name: 'Ground Floor', rooms: 6 },
        { name: 'First Floor', rooms: 4 },
        { name: 'Second Floor', rooms: 5 },
      ],
    },
    {
      name: 'Royal Hostel',
      rating: 4.5,
      location: 'Banjara Hills, Hyderabad',
      tags: ['Hostels', 'Luxury Hostels'],
      phone: '09123456789',
      enquiries: 512,
      image: 'https://images.unsplash.com/photo-1600082848671-30d4b800c5d4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      floors: 6,
      totalavailableRooms: 25,
      floorDetails: [
        { name: 'Ground Floor', rooms: 5 },
        { name: 'First Floor', rooms: 4 },
        { name: 'Second Floor', rooms: 4 },
        { name: 'Third Floor', rooms: 4 },
        { name: 'Fourth Floor', rooms: 4 },
        { name: 'Fifth Floor', rooms: 2 },
        { name: 'Sixth Floor', rooms: 2 },
      ],
    },
    {
      name: 'Greenfield Hostel',
      rating: 4.2,
      location: 'Hitech City, Hyderabad',
      tags: ['Hostels', 'Eco-friendly'],
      phone: '08888888888',
      enquiries: 312,
      image: 'https://images.unsplash.com/photo-1555685815-281dd60ff9b8?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      floors: 4,
      totalavailableRooms: 18,
      floorDetails: [
        { name: 'Ground Floor', rooms: 4 },
        { name: 'First Floor', rooms: 5 },
        { name: 'Second Floor', rooms: 5 },
        { name: 'Third Floor', rooms: 4 },
      ],
    },
    {
      name: 'Elite Hostel',
      rating: 4.8,
      location: 'Jubilee Hills, Hyderabad',
      tags: ['Hostels', 'Premium Hostels'],
      phone: '09876543210',
      enquiries: 689,
      image: 'https://images.unsplash.com/photo-1506748686214e9df14f8c80d0c1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      floors: 7,
      totalavailableRooms: 30,
      floorDetails: [
        { name: 'Ground Floor', rooms: 5 },
        { name: 'First Floor', rooms: 5 },
        { name: 'Second Floor', rooms: 5 },
        { name: 'Third Floor', rooms: 5 },
        { name: 'Fourth Floor', rooms: 4 },
        { name: 'Fifth Floor', rooms: 3 },
        { name: 'Sixth Floor', rooms: 2 },
        { name: 'Seventh Floor', rooms: 1 },
      ],
    },
  ];
  
  

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleExpandClick = (index) => {
    setExpandedHostel(expandedHostel === index ? null : index);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>


<Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Grid container spacing={2} >
        <Grid item xs={12} md={5} >

    
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search hostels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
              endAdornment: (
                  <IconButton>
                <SearchIcon />
              </IconButton>
            ),
        }}
        />
        </Grid>

        <Grid item xs={12} md={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            label="Filter Category"
            >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Hostels">Hostels</MenuItem>
            <MenuItem value="RentHouse">Rent House</MenuItem>
            <MenuItem value="PG">PG</MenuItem>
          </Select>
        </FormControl>
              </Grid>

        {/* date picker for hotel */}

        {
            filterCategory === "RentHouse" ? ( <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <DatePicker
                    label="Check-in Date"
                    value={startDate}
                    // onChange={(date) => setStartDate(date)}
                    onChange={(date) => {
                        setStartDate(date);
                        // Reset endDate if it is before the new startDate
                        if (endDate && date && dayjs(endDate).isBefore(date)) {
                          setEndDate(null);
                        }
                      }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                  <DatePicker
                    label="Check-out Date"
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Box>
                </Grid>) :''
        }
       
        

        {/* hostel tag search  */}
            {
                filterCategory === "Hostels" ? (
                     <Grid item xs={12} md={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Filter by Tag</InputLabel>
                      <Select
                        value={filterTag}
                        onChange={(e) => setFilterTag(e.target.value)}
                        label="Filter by Tag"
                        >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Hostels">Hostels</MenuItem>
                        <MenuItem value="Hostels For Men">Hostels For Men</MenuItem>
                        <MenuItem value="Hostels For Women">Hostels For Women</MenuItem>
                        <MenuItem value="Budget Hostels">Budget Hostels</MenuItem>
                        <MenuItem value="Luxury Hostels">Luxury Hostels</MenuItem>
                        <MenuItem value="Eco-friendly">Eco-friendly</MenuItem>
                        <MenuItem value="Premium Hostels">Premium Hostels</MenuItem>
                      </Select>
                    </FormControl>
                          </Grid>) : ''
            }
       
        </Grid>
      </Box>


      {/* Hostel Listings */}
      <Grid container spacing={3}>
        {hostelData.map((hostel, index) => (
          <Grid item xs={12} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                position: 'relative',
                backgroundColor: '#CCCCCC',
                borderRadius: '1rem',
                padding: 2,
                gap: 2,
                overflow: 'hidden',
              }}
            >
              <img
                src={hostel.image}
                alt={hostel.name}
                style={{
                  width: '100%',
                  maxWidth: '13rem',
                  height: 'auto',
                  borderRadius: '1rem',
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {hostel.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hostel.location}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {hostel.tags.map((tag, idx) => (
                    <Button key={idx} size="small" variant="outlined" sx={{ mr: 1 }}>
                      {tag}
                    </Button>
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <strong>{hostel.enquiries}</strong> people recently enquired
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Button variant="contained" color="success" startIcon={<PhoneIcon />}>
                        {hostel.phone}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined">Send Enquiry</Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" startIcon={<ChatIcon />}>
                        Chat
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Button
                  sx={{ mt: 2, backgroundColor: 'green', color: 'white',"&:hover": {
                    background: 'green'
                  } }}
                  onClick={() => handleExpandClick(index)}
                  endIcon={<ExpandMoreIcon />}
                >
                  {hostel.totalavailableRooms} Rooms Available
                </Button>
                <Collapse in={expandedHostel === index}>
                  <Hostelinfo floorDetails={hostel.floorDetails}  />
                </Collapse>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HostelList;
