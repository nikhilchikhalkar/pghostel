import React, { useState } from 'react';
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText, Button } from '@mui/material';

const InventoryManagement = () => {
  // Sample data for IMS Types and Items
  const imsTypes = ['SD: STORE DATA', 'KD: KITCHEN DATA', 'CD: CHANGING ROOMS DATA'];
  const items = [
    { imstype:'SD: STORE DATA' ,id: 'Towe0001', name: 'Towels Big Size', unitPrice: '5.00', quantity: '100', minQuantity: '20', status: 'Normal', supplierName: 'ABC Textiles', supplierMobile: '+1234567890' },
    { imstype:'CD: CHANGING ROOMS DATA' ,  id: 'Towl0002', name: 'Towels Small Size', unitPrice: '3.00', quantity: '150', minQuantity: '30', status: 'Excess', supplierName: 'XYZ Suppliers', supplierMobile: '+0987654321' },
    {  imstype:'SD: STORE DATA' , id: 'Towl0003', name: 'Towels Medium Size', unitPrice: '4.00', quantity: '80', minQuantity: '15', status: 'Less', supplierName: 'LMN Distributors', supplierMobile: '+1122334455' },
    { imstype:'SD: STORE DATA' ,  id: 'Soap0001', name: 'Hand Soap', unitPrice: '1.50', quantity: '200', minQuantity: '50', status: 'Normal', supplierName: 'CleanCo', supplierMobile: '+2233445566' },
    { imstype:'KD: KITCHEN DATA' ,  id: 'Sham0001', name: 'Shampoo Bottles', unitPrice: '7.00', quantity: '60', minQuantity: '10', status: 'Less', supplierName: 'HairCare Ltd.', supplierMobile: '+3344556677' },
    { imstype:'SD: STORE DATA' ,  id: 'Cond0001', name: 'Conditioner Bottles', unitPrice: '6.50', quantity: '70', minQuantity: '20', status: 'Normal', supplierName: 'SmoothCo', supplierMobile: '+4455667788' },
    { imstype:'KD: KITCHEN DATA' ,  id: 'Dete0001', name: 'Laundry Detergent', unitPrice: '8.00', quantity: '120', minQuantity: '30', status: 'Excess', supplierName: 'WashWell', supplierMobile: '+5566778899' },
    { imstype:'CD: CHANGING ROOMS DATA' ,  id: 'Bath0001', name: 'Bathrobes', unitPrice: '15.00', quantity: '50', minQuantity: '10', status: 'Normal', supplierName: 'ComfortWear', supplierMobile: '+6677889900' }
  ];

  // State to track selected IMS type
  const [selectedType, setSelectedType] = useState('');
  const [IMType, setIMType] = useState(items);

  // Handle clicking an IMS type
  const handleTypeClick = (type) => {
    setSelectedType(type);
    console.log("type selected",type);
    
  };

  //  selected type
  const HandleSelectedIMType = () => {
    if (selectedType) {
        const filtered = items.filter(item => item.imstype === selectedType);
        setIMType(filtered);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" align="center">Inventory Management System</Typography>
      <Grid container spacing={2}>
        {/* Sidebar for IMS Types */}
        <Grid item xs={12} md={2}>
            <Box>IMS Type</Box>
          <List>
            {imsTypes.map((type, index) => (
              <ListItem key={index} button onClick={() => handleTypeClick(type)} sx={{'&:hover': { backgroundColor: selectedType ===type ? 'green' : 'transparent' }, backgroundColor: selectedType === type ? 'green' : ''}}>
                <ListItemText primary={type} />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={HandleSelectedIMType}
            disabled={!selectedType}
          >
            Get Data
          </Button>
        </Grid>

        {/* Table Section */}
        <Grid item xs={12} md={10}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item ID</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Min Quantity</TableCell>
                  <TableCell>Status (Less/Normal/Excess)</TableCell>
                  <TableCell>Supplier Name</TableCell>
                  <TableCell>Supplier Mobile</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {IMType.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell><Typography>{item.id}</Typography></TableCell>
                    <TableCell><Typography>{item.name}</Typography></TableCell>
                    <TableCell><Typography>{item.unitPrice}</Typography></TableCell>
                    <TableCell><Typography>{item.quantity}</Typography></TableCell>
                    <TableCell><Typography>{item.minQuantity}</Typography></TableCell>
                    <TableCell><Typography>{item.status}</Typography></TableCell>
                    <TableCell><Typography>{item.supplierName}</Typography></TableCell>
                    <TableCell><Typography>{item.supplierMobile}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InventoryManagement;
