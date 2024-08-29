import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Switch,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import BedRoundedIcon from '@mui/icons-material/BedRounded';
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import { ToastContainer, toast } from "react-toastify";
// import ScrollToTop from 'react-scroll-up';

const Header = styled(Box)({
  textAlign: "center",
  padding: "1rem",
  backgroundColor: "#f5f5f5",
  borderBottom: "1px solid #ccc",
});

const SectionTitle = styled(Box)({
  backgroundColor: "#FFDDC1",
  padding: "0.5rem",
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: "1rem",
});

const CustomPaper = styled(Paper)({
  padding: "1rem",
  textAlign: "center",
  backgroundColor: "#E0ECFF",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const HostelManagement = () => {
  const [formData, setFormData] = useState({
    hotelName: "",
    owners: [{ name: "", email: "", contact: "" }],
    floors: [{ name: "Floor - 1", rooms: [] }],
  });

  const [errors, setErrors] = useState({
    ownerError: "",
    emailError: "",
    contactError: "",
  });
  const [facilitiesDialog, setFacilitiesDialog] = useState({
    open: false,
    floorIndex: null,
    roomIndex: null,
  });
  const [customFacility, setCustomFacility] = useState("");

  const facilitiesList = [
    "3 times food ",
    "WiFi",
    "Lift",
    "Drinking water (RO water)",
    "Hot water",
    "24/7 water supply ",
    "Power supply",
    "AC",
    "Non-AC",
    "Lockers/ Racks",
    "24/7 CCTV surveillance",
    "Fully furnished",
    "Daily cleaning & housekeeping services",
    "Washing machine",
    "Security guard",
    "Power backup",
    "bed, bedsheet, pillow",
    "laundry service",
    "study table",
    "biometric security",
    "shuttle facility",
    "tea (or) coffee machines",
    "first aid kit",
    "table tennis kit",
    "gym",
  ];

  const addOwner = () => {
    if (formData.owners.length < 3) {
      setFormData({
        ...formData,
        owners: [
          ...formData.owners,
          { name: "", email: "", countryCode: "+1", contact: "" },
        ],
      });
    }
  };

  const addFloor = () => {
    if (formData.floors.length < 99) {
      setFormData({
        ...formData,
        floors: [
          ...formData.floors,
          { name: `Floor - ${formData.floors.length + 1}`, rooms: [] },
        ],
      });
    }
  };

  const addRoom = (floorIndex) => {
    const updatedFloors = formData.floors.map((floor, index) => {
      if (index === floorIndex && floor.rooms.length < 99) {
        const newRoomIndex = floor.rooms.length + 1;
        return {
          ...floor,
          rooms: [
            ...floor.rooms,
            {
              name: `Room ${newRoomIndex}`,
              beds: [],
              facilities: facilitiesList.map((facility) => ({
                name: facility,
                isToggled: false,
              })),
            },
          ],
        };
      }
      return floor;
    });

    // Re-index rooms after adding
    const reIndexedFloors = updatedFloors.map((floor) => ({
      ...floor,
      rooms: floor.rooms.map((room, idx) => ({
        ...room,
        name: `Room ${idx + 1}`,
      })),
    }));

    setFormData({ ...formData, floors: reIndexedFloors });
  };

  const addBed = (floorIndex, roomIndex) => {
    const updatedFloors = formData.floors.map((floor, fIndex) => {
      if (fIndex === floorIndex) {
        const updatedRooms = floor.rooms.map((room, rIndex) => {
          if (rIndex === roomIndex && room.beds.length < 20) {
            return {
              ...room,
              beds: [
                ...room.beds,
                { name: `Bed ${room.beds.length + 1}`, available: true },
              ],
            };
          }
          return room;
        });
        return { ...floor, rooms: updatedRooms };
      }
      return floor;
    });
    setFormData({ ...formData, floors: updatedFloors });
  };

  const toggleBedAvailability = (floorIndex, roomIndex, bedIndex) => {
    const updatedFloors = formData.floors.map((floor, fIndex) => {
      if (fIndex === floorIndex) {
        const updatedRooms = floor.rooms.map((room, rIndex) => {
          if (rIndex === roomIndex) {
            const updatedBeds = room.beds.map((bed, bIndex) => {
              if (bIndex === bedIndex) {
                return { ...bed, available: !bed.available };
              }
              return bed;
            });
            return { ...room, beds: updatedBeds };
          }
          return room;
        });
        return { ...floor, rooms: updatedRooms };
      }
      return floor;
    });
    setFormData({ ...formData, floors: updatedFloors });
  };

  const deleteBed = (floorIndex, roomIndex, bedIndex) => {
    const updatedFloors = formData.floors.map((floor, fIndex) => {
      if (fIndex === floorIndex) {
        const updatedRooms = floor.rooms.map((room, rIndex) => {
          if (rIndex === roomIndex) {
            return {
              ...room,
              beds: room.beds.filter((_, bIndex) => bIndex !== bedIndex),
            };
          }
          return room;
        });
        return { ...floor, rooms: updatedRooms };
      }
      return floor;
    });
    setFormData({ ...formData, floors: updatedFloors });
  };

  const deleteRoom = (floorIndex, roomIndex) => {
    const updatedFloors = formData.floors.map((floor, fIndex) => {
      if (fIndex === floorIndex) {
        const updatedRooms = floor.rooms.filter(
          (_, rIndex) => rIndex !== roomIndex
        );
        return {
          ...floor,
          rooms: updatedRooms.map((room, idx) => ({
            ...room,
            name: `Room ${idx + 1}`, // Re-index rooms after deletion
          })),
        };
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
    const hasValidOwner = formData.owners.some(
      (owner) =>
        owner.name.trim() !== "" &&
        validateEmail(owner.email) &&
        validateContact(owner.contact)
    );

    if (!hasValidOwner) {
      setErrors({
        ownerError:
          "At least one owner with a valid name, email, and contact number is required.",
        emailError: formData.owners.some((owner) => !validateEmail(owner.email))
          ? "Some email addresses are invalid."
          : "",
        contactError: formData.owners.some(
          (owner) => !validateContact(owner.contact)
        )
          ? "Some contact numbers are invalid."
          : "",
      });

      toast.error(
        "At least one owner with a valid name, email, and contact number is required.",
        {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        }
      );

      return false;
    }

    setErrors({ ownerError: "", emailError: "", contactError: "" });
    return true;
  };

  const validateEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContact = (contact) => {
    // Basic contact number validation (example: must be a 10-digit number)
    const contactRegex = /^[0-9]{10}$/;
    return contactRegex.test(contact);
  };

  const handleFacilitiesDialogOpen = (floorIndex, roomIndex) => {
    setFacilitiesDialog({ open: true, floorIndex, roomIndex });
  };

  const handleFacilitiesDialogClose = () => {
    setFacilitiesDialog({ open: false, floorIndex: null, roomIndex: null });
  };

  const handleFacilityToggle = (facilityName) => {
    const { floorIndex, roomIndex } = facilitiesDialog;

    const updatedFloors = formData.floors.map((floor, fIndex) => {
      if (fIndex === floorIndex) {
        const updatedRooms = floor.rooms.map((room, rIndex) => {
          if (rIndex === roomIndex) {
            const updatedFacilities = room.facilities.map((facility) =>
              facility.name === facilityName
                ? { ...facility, isToggled: !facility.isToggled }
                : facility
            );
            return { ...room, facilities: updatedFacilities };
          }
          return room;
        });
        return { ...floor, rooms: updatedRooms };
      }
      return floor;
    });

    setFormData({ ...formData, floors: updatedFloors });
  };

  const addCustomFacility = () => {
    const { floorIndex, roomIndex } = facilitiesDialog;

    const updatedFloors = formData.floors.map((floor, fIndex) => {
      if (fIndex === floorIndex) {
        const updatedRooms = floor.rooms.map((room, rIndex) => {
          if (rIndex === roomIndex) {
            return {
              ...room,
              facilities: [
                ...room.facilities,
                { name: customFacility, isToggled: true },
              ],
            };
          }
          return room;
        });
        return { ...floor, rooms: updatedRooms };
      }
      return floor;
    });

    setFormData({ ...formData, floors: updatedFloors });
    setCustomFacility("");
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form data:", formData);
      toast.success("Form data submitted successfully", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  return (
    <Box>
      <Header>
        <Typography variant="h4">Hostel Management</Typography>
      </Header>
      <Box padding={3}>
        <SectionTitle>
          <Typography variant="h6">Hostel Information</Typography>
        </SectionTitle>
        <Box marginBottom={3}>
          <TextField
            label="Hostel Name"
            variant="outlined"
            fullWidth
            value={formData.hotelName}
            onChange={(e) => handleChange("hotelName", e.target.value)}
          />
        </Box>

        <SectionTitle>
          <Typography variant="h6">Owners</Typography>
        </SectionTitle>
        {formData.owners.map((owner, index) => (
          <Box key={index} marginBottom={3}>
            <Typography variant="subtitle1">{`Owner ${index + 1}`}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Owner Name"
                  variant="outlined"
                  fullWidth
                  value={owner.name}
                  onChange={(e) =>
                    handleOwnerChange(index, "name", e.target.value)
                  }
                  error={!!errors.ownerError}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Owner Email"
                  variant="outlined"
                  fullWidth
                  value={owner.email}
                  onChange={(e) =>
                    handleOwnerChange(index, "email", e.target.value)
                  }
                  error={!!errors.emailError}
                />
              </Grid>
              <Grid item xs={3} sm={2}>
                <TextField
                  select
                  label="Country Code"
                  name="countryCode"
                  value={owner.countryCode}
                  onChange={(e) =>
                    handleOwnerChange(index, "countryCode", e.target.value)
                  }
                  fullWidth
                >
                  <MenuItem value="+1">+1 (USA)</MenuItem>
                  <MenuItem value="+91">+91 (India)</MenuItem>
                  <MenuItem value="+44">+44 (UK)</MenuItem>
                  <MenuItem value="+33">+33 (France)</MenuItem>
                  <MenuItem value="+49">+49 (Germany)</MenuItem>
                  <MenuItem value="+61">+61 (Australia)</MenuItem>
                  <MenuItem value="+81">+81 (Japan)</MenuItem>
                  <MenuItem value="+55">+55 (Brazil)</MenuItem>
                  <MenuItem value="+86">+86 (China)</MenuItem>
                  <MenuItem value="+27">+27 (South Africa)</MenuItem>
                  <MenuItem value="+7">+7 (Russia)</MenuItem>
                  <MenuItem value="+39">+39 (Italy)</MenuItem>
                  <MenuItem value="+34">+34 (Spain)</MenuItem>
                  <MenuItem value="+42">+42 (Czech Republic)</MenuItem>
                  <MenuItem value="+60">+60 (Malaysia)</MenuItem>
                  <MenuItem value="+52">+52 (Mexico)</MenuItem>
                  <MenuItem value="+62">+62 (Indonesia)</MenuItem>
                  <MenuItem value="+98">+98 (Iran)</MenuItem>
                  <MenuItem value="+90">+90 (Turkey)</MenuItem>
                  <MenuItem value="+41">+41 (Switzerland)</MenuItem>
                  <MenuItem value="+31">+31 (Netherlands)</MenuItem>
                  <MenuItem value="+46">+46 (Sweden)</MenuItem>
                  <MenuItem value="+32">+32 (Belgium)</MenuItem>
                  <MenuItem value="+91">+91 (India)</MenuItem>
                  <MenuItem value="+48">+48 (Poland)</MenuItem>
                  <MenuItem value="+45">+45 (Denmark)</MenuItem>
                  <MenuItem value="+56">+56 (Chile)</MenuItem>
                  <MenuItem value="+54">+54 (Argentina)</MenuItem>
                  <MenuItem value="+65">+65 (Singapore)</MenuItem>
                  <MenuItem value="+21">+21 (Colombia)</MenuItem>
                  <MenuItem value="+96">+96 (United Arab Emirates)</MenuItem>
                  <MenuItem value="+30">+30 (Greece)</MenuItem>
                  <MenuItem value="+354">+354 (Iceland)</MenuItem>
                  <MenuItem value="+372">+372 (Estonia)</MenuItem>
                  <MenuItem value="+370">+370 (Lithuania)</MenuItem>
                  <MenuItem value="+371">+371 (Latvia)</MenuItem>
                  <MenuItem value="+363">+363 (Hungary)</MenuItem>
                  <MenuItem value="+381">+381 (Serbia)</MenuItem>
                  <MenuItem value="+382">+382 (Montenegro)</MenuItem>
                  <MenuItem value="+383">+383 (Kosovo)</MenuItem>
                  <MenuItem value="+420">+420 (Czech Republic)</MenuItem>
                  <MenuItem value="+41">+41 (Switzerland)</MenuItem>
                  <MenuItem value="+233">+233 (Ghana)</MenuItem>
                  <MenuItem value="+221">+221 (Senegal)</MenuItem>
                  <MenuItem value="+234">+234 (Nigeria)</MenuItem>
                  <MenuItem value="+20">+20 (Egypt)</MenuItem>
                  <MenuItem value="+965">+965 (Kuwait)</MenuItem>
                  <MenuItem value="+966">+966 (Saudi Arabia)</MenuItem>
                  <MenuItem value="+971">+971 (United Arab Emirates)</MenuItem>
                  <MenuItem value="+974">+974 (Qatar)</MenuItem>
                  <MenuItem value="+968">+968 (Oman)</MenuItem>
                  <MenuItem value="+7">+7 (Kazakhstan)</MenuItem>
                  <MenuItem value="+977">+977 (Nepal)</MenuItem>
                  <MenuItem value="+994">+994 (Azerbaijan)</MenuItem>
                  <MenuItem value="+375">+375 (Belarus)</MenuItem>
                  <MenuItem value="+370">+370 (Lithuania)</MenuItem>
                  <MenuItem value="+371">+371 (Latvia)</MenuItem>
                  <MenuItem value="+372">+372 (Estonia)</MenuItem>
                  <MenuItem value="+976">+976 (Mongolia)</MenuItem>
                  <MenuItem value="+856">+856 (Laos)</MenuItem>
                  <MenuItem value="+855">+855 (Cambodia)</MenuItem>
                  <MenuItem value="+84">+84 (Vietnam)</MenuItem>
                  <MenuItem value="+60">+60 (Malaysia)</MenuItem>
                  <MenuItem value="+67">+67 (Palau)</MenuItem>
                  <MenuItem value="+680">+680 (Palau)</MenuItem>
                  <MenuItem value="+686">+686 (Kiribati)</MenuItem>
                  <MenuItem value="+687">+687 (New Caledonia)</MenuItem>
                  <MenuItem value="+688">+688 (Tuvalu)</MenuItem>
                  <MenuItem value="+689">+689 (French Polynesia)</MenuItem>
                  <MenuItem value="+690">+690 (Tokelau)</MenuItem>
                  <MenuItem value="+691">+691 (Micronesia)</MenuItem>
                  <MenuItem value="+692">+692 (Marshall Islands)</MenuItem>
                  <MenuItem value="+699">+699 (Niue)</MenuItem>
                  <MenuItem value="+670">+670 (Timor-Leste)</MenuItem>
                  <MenuItem value="+671">+671 (Guam)</MenuItem>
                  <MenuItem value="+673">+673 (Brunei)</MenuItem>
                  <MenuItem value="+674">+674 (Nauru)</MenuItem>
                  <MenuItem value="+675">+675 (Papua New Guinea)</MenuItem>
                  <MenuItem value="+676">+676 (Tonga)</MenuItem>
                  <MenuItem value="+677">+677 (Solomon Islands)</MenuItem>
                  <MenuItem value="+678">+678 (Vanuatu)</MenuItem>
                  <MenuItem value="+679">+679 (Fiji)</MenuItem>
                  <MenuItem value="+680">+680 (Palau)</MenuItem>
                  <MenuItem value="+685">+685 (Samoa)</MenuItem>
                  <MenuItem value="+686">+686 (Kiribati)</MenuItem>
                  <MenuItem value="+688">+688 (Tuvalu)</MenuItem>
                  <MenuItem value="+689">+689 (French Polynesia)</MenuItem>
                  <MenuItem value="+690">+690 (Tokelau)</MenuItem>
                  <MenuItem value="+691">+691 (Micronesia)</MenuItem>
                  <MenuItem value="+692">+692 (Marshall Islands)</MenuItem>
                  <MenuItem value="+695">+695 (Nauru)</MenuItem>
                  <MenuItem value="+700">
                    +700 (Svalbard and Jan Mayen)
                  </MenuItem>
                  <MenuItem value="+701">+701 (Jan Mayen)</MenuItem>
                  <MenuItem value="+702">+702 (Norway)</MenuItem>
                  <MenuItem value="+703">+703 (Greenland)</MenuItem>
                  <MenuItem value="+704">+704 (Faroe Islands)</MenuItem>
                  <MenuItem value="+705">+705 (Iceland)</MenuItem>
                  <MenuItem value="+706">+706 (Sweden)</MenuItem>
                  <MenuItem value="+707">+707 (Finland)</MenuItem>
                  <MenuItem value="+708">+708 (Estonia)</MenuItem>
                  <MenuItem value="+709">+709 (Latvia)</MenuItem>
                  <MenuItem value="+710">+710 (Lithuania)</MenuItem>
                  <MenuItem value="+711">+711 (Poland)</MenuItem>
                  <MenuItem value="+712">+712 (Czech Republic)</MenuItem>
                  <MenuItem value="+713">+713 (Slovakia)</MenuItem>
                  <MenuItem value="+714">+714 (Hungary)</MenuItem>
                  <MenuItem value="+715">+715 (Romania)</MenuItem>
                  <MenuItem value="+716">+716 (Serbia)</MenuItem>
                  <MenuItem value="+717">+717 (Croatia)</MenuItem>
                  <MenuItem value="+718">+718 (Slovenia)</MenuItem>
                  <MenuItem value="+719">
                    +719 (Bosnia and Herzegovina)
                  </MenuItem>
                  <MenuItem value="+720">+720 (Montenegro)</MenuItem>
                  <MenuItem value="+721">+721 (Kosovo)</MenuItem>
                  <MenuItem value="+722">+722 (North Macedonia)</MenuItem>
                  <MenuItem value="+723">+723 (Albania)</MenuItem>
                  <MenuItem value="+724">+724 (Bulgaria)</MenuItem>
                  <MenuItem value="+725">+725 (Greece)</MenuItem>
                  <MenuItem value="+726">+726 (Turkey)</MenuItem>
                  <MenuItem value="+727">+727 (Cyprus)</MenuItem>
                  <MenuItem value="+728">+728 (Malta)</MenuItem>
                  <MenuItem value="+729">+729 (Israel)</MenuItem>
                  <MenuItem value="+730">+730 (Lebanon)</MenuItem>
                  <MenuItem value="+731">+731 (Jordan)</MenuItem>
                  <MenuItem value="+732">+732 (Syria)</MenuItem>
                  <MenuItem value="+733">+733 (Iraq)</MenuItem>
                  <MenuItem value="+734">+734 (Iran)</MenuItem>
                  <MenuItem value="+735">+735 (Saudi Arabia)</MenuItem>
                  <MenuItem value="+736">+736 (Kuwait)</MenuItem>
                  <MenuItem value="+737">+737 (Bahrain)</MenuItem>
                  <MenuItem value="+738">+738 (Qatar)</MenuItem>

                  {/* Add more country codes as needed */}
                </TextField>
              </Grid>
              <Grid item xs={9} sm={4}>
                <TextField
                  type="tel"
                  label="Mobile Number"
                  name="mobileNumber"
                  value={owner.contact}
                  onChange={(e) =>
                    handleOwnerChange(index, "contact", e.target.value)
                  }
                  error={!!errors.contactError}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {owner.countryCode}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* <Grid item xs={12} sm={4}>
                <TextField
                  label="Owner Contact"
                  variant="outlined"
                  fullWidth
                  value={owner.contact}
                  onChange={(e) => handleOwnerChange(index, 'contact', e.target.value)}
                  error={!!errors.contactError}
                />
              </Grid> */}
            </Grid>
          </Box>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={addOwner}
          sx={{ marginBottom: "1rem" }}
          disabled={formData.owners.length >= 3}
        >
          Add Owner
        </Button>
        <Typography color="error">{errors.ownerError}</Typography>

        <SectionTitle>
          <Typography variant="h6">Floors and Rooms</Typography>
        </SectionTitle>
        {formData.floors.map((floor, floorIndex) => (
          <Box key={floorIndex} marginBottom={3}>
            <CustomPaper sx={{ marginBottom: "2rem" }}>
              <Typography variant="h6">{floor.name}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addRoom(floorIndex)}
                disabled={floor.rooms.length >= 10}
              >
                Add Room
              </Button>
            </CustomPaper>
            <Grid container spacing={2}>
              {floor.rooms.map((room, roomIndex) => (
                <Grid item xs={12} sm={6} key={roomIndex}>
                  <Box marginBottom={2}>
                    <CustomPaper>
                      <Typography variant="subtitle1">{room.name}</Typography>
                      <Box>
                        <Button
                          startIcon={<AddCircleIcon />}
                          variant="outlined"
                          color="success"
                          onClick={() => addBed(floorIndex, roomIndex)}
                          disabled={room.beds.length >= 20}
                        >
                          Add Bed
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{ margin: "1rem" }}
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => deleteRoom(floorIndex, roomIndex)}
                        >
                          {room.name}
                        </Button>
                        <Button
                          startIcon={<AddCircleIcon />}
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            handleFacilitiesDialogOpen(floorIndex, roomIndex)
                          }
                        >
                          Add Facility
                        </Button>
                      </Box>
                    </CustomPaper>

                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Beds</TableCell>
                          <TableCell>Available</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {room.beds.map((bed, bedIndex) => (
                          <TableRow key={bedIndex}>
                            <TableCell>{bed.name}</TableCell>
                            <TableCell>
                              <Switch
                                checked={bed.available}
                                onChange={() =>
                                  toggleBedAvailability(
                                    floorIndex,
                                    roomIndex,
                                    bedIndex
                                  )
                                }
                                color="primary"
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() =>
                                  deleteBed(floorIndex, roomIndex, bedIndex)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={addFloor}
          disabled={formData.floors.length >= 99}
        >
          Add Floor
        </Button>
        <Box
          sx={{
            display: "flex",
            marginRight: "auto",
            justifyContent: "flex-end",
            marginLeft: "5rem",
            marginTop: "4rem",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            sx={{ marginTop: "1rem" }}
          >
            Submit
          </Button>
        </Box>

        <Dialog open={facilitiesDialog.open}>
          <Box
            sx={{
              display: "flex",
              marginLeft: "auto",
              justifyContent: "end",
              marginRight: "2rem",
              marginTop: "1rem",
            }}
          >
            <button
              className="p-1 bg-red-500 text-white rounded"
              onClick={handleFacilitiesDialogClose}
            >
              <CloseIcon />
            </button>
          </Box>
          <DialogTitle sx={{ marginX: "auto", fontWeight: "bold" }}>
            Facilities
          </DialogTitle>
          <DialogContent>
            {/* {formData.floors[facilitiesDialog.floorIndex]?.rooms[
              facilitiesDialog.roomIndex
            ]?.facilities.map((facility) => (
              <Box key={facility.name} display="flex" alignItems="center">
                <Typography>{facility.name}</Typography>
                <Switch
                  checked={facility.isToggled}
                  onChange={() => handleFacilityToggle(facility.name)}
                  color="primary"
                />
                
              </Box>
            ))} */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Facility Status</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Facility Status</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.floors[facilitiesDialog.floorIndex]?.rooms[
                  facilitiesDialog.roomIndex
                ]?.facilities
                  .reduce((rows, facility, index, facilities) => {
                    if (index % 2 === 0) {
                      rows.push(facilities.slice(index, index + 2));
                    }
                    return rows;
                  }, [])
                  .map((pair, index) => (
                    <TableRow key={index}>
                      {pair.map((facility) => (
                        <>
                          <TableCell key={facility.name}>
                            {facility.name}
                          </TableCell>
                          <TableCell key={`${facility.name}-switch`}>
                            <Switch
                              checked={facility.isToggled}
                              onChange={() =>
                                handleFacilityToggle(facility.name)
                              }
                              color="primary"
                            />
                          </TableCell>
                        </>
                      ))}
                      {pair.length === 1 && (
                        <>
                          <TableCell />
                          <TableCell />
                        </>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TextField
              label="Custom Facility"
              variant="outlined"
              fullWidth
              value={customFacility}
              onChange={(e) => setCustomFacility(e.target.value)}
              sx={{ marginTop: "1rem" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addCustomFacility}
              disabled={!customFacility.trim()}
              sx={{ marginTop: "1rem" }}
            >
              Add Custom Facility
            </Button>
          </DialogContent>
        </Dialog>

        {/* <ScrollToTop showUnder={160}>
          <IconButton sx={{backgroundColor:'blue'}} >
            <KeyboardDoubleArrowUpRoundedIcon />
          </IconButton>
        </ScrollToTop> */}
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default HostelManagement;
