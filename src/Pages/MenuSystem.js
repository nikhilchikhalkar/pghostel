import React, { useState } from 'react';
import { Box, Grid, Typography, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const MenuSystem = () => {
  const categories = ['Veg', 'Non-Veg', 'Drinks'];

  const subcategories = {
    'Veg': ['Breakfast', 'Starter', 'Main Course'],
    'Non-Veg': ['Breakfast', 'Starter', 'Main Course'],
    'Drinks': ['Soft Drinks', 'Alcoholic Drinks']
  };

  // Updated items with names and prices
  const menuItems = {
    'Breakfast': [
      { name: 'Idli', price: '₹50' },
      { name: 'Poha', price: '₹40' },
      { name: 'Upma', price: '₹45' }
    ],
    'Starter': [
      { name: 'Paneer Tikka', price: '₹150' },
      { name: 'Chicken Tikka', price: '₹180' },
      { name: 'Spring Rolls', price: '₹120' }
    ],
    'Main Course': [
      { name: 'Biryani', price: '₹200' },
      { name: 'Pasta', price: '₹160' },
      { name: 'Dal Tadka', price: '₹130' }
    ],
    'Soft Drinks': [
      { name: 'Coke', price: '₹30' },
      { name: 'Pepsi', price: '₹30' },
      { name: 'Sprite', price: '₹30' }
    ],
    'Alcoholic Drinks': [
      { name: 'Beer', price: '₹250' },
      { name: 'Whiskey', price: '₹500' },
      { name: 'Vodka', price: '₹400' }
    ]
  };

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
    if (category) {
      const itemsToShow = Object.keys(subcategories[category]).flatMap(subcat => menuItems[subcategories[category][subcat]] || []);
      setFilteredItems(itemsToShow);
    } else {
      setFilteredItems(Object.values(menuItems).flat());
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setFilteredItems(menuItems[subcategory] || []);
  };

  const initialItems = Object.values(menuItems).flat();

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>Menu Management System</Typography>
      <Grid container spacing={2}>
        {/* Sidebar for Categories */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6">Categories</Typography>
          <List>
            {categories.map((category, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleCategoryClick(category)}
                sx={{
                  '&:hover': { backgroundColor: selectedCategory === category ? 'green' : 'transparent' },
                  backgroundColor: selectedCategory === category ? '#7be34b' : ''
                }}
              >
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Sidebar for Subcategories */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6" sx={{display: selectedCategory==="" ? 'none' : 'block'}}>Subcategories</Typography>
          <List>
            {subcategories[selectedCategory]?.map((subcategory, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleSubcategoryClick(subcategory)}
                sx={{
                  '&:hover': { backgroundColor: selectedSubcategory === subcategory ? '#3ea7ed' : 'transparent' },
                  backgroundColor: selectedSubcategory === subcategory ? '#4e93c2' : ''
                }}
              >
                <ListItemText primary={subcategory} />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Display Menu Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Items {selectedCategory && `in ${selectedCategory}`} {selectedSubcategory && `- ${selectedSubcategory}`}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(selectedCategory || selectedSubcategory ? filteredItems : initialItems).map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MenuSystem;
