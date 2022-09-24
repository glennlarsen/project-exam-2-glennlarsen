import React, { useState } from "react";
import Layout from "components/layout/Layout";
import OuterContainer from "components/layout/OuterContainer";
import Head from "components/layout/Head";
import Heading from "components/typography/Heading";
import AdminHeader from "components/admin/AdminHeader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputsTheme from "components/forms/InputsTheme";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import "./addestablishment.scss";
import DropDown from "components/forms/Dropdown";
import MenuItem from "@mui/material/MenuItem";
import AddressAutoComplete from "./AddressAutoComplete";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import AddFacilities from "./AddFacilities";
import AddStarRating from "./AddStarRating";
import BreakfastIncluded from "./BreakfastIncluded";
import AddImages from "./AddImages";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: 800,
  width: "95%",
  bgcolor: "background.paper",
  borderRadius: "12px",
  gap: 2,
  boxShadow: 5,
  p: 4,
  pt: 2,
  margin: "0 auto",
  mb: 4,
  transition: "height 0.3s ease-in-out",
};

const AddEstablishment = () => {
  const [typeValue, setTypeValue] = useState(1);

  const handleTypeChange = (event) => {
    event.preventDefault();
    setTypeValue(event.target.value);
  };

  return (
    <Layout>
      <Head
        page="Admin - Enquiries"
        description="Holidaze Admin - Received Enquiries from your establishments"
      />
      <OuterContainer>
        <AdminHeader
          heading="Add New Establishment"
          icon={<ArrowBackIcon />}
          iconToolTip="Go Back"
          iconLink="/establishments"
        />
        <Box sx={boxStyle} component="form" noValidate>
          <Heading level={2}>Details</Heading>
          <InputsTheme>
            <TextField
              label={"Title"}
              id="title"
              variant={"outlined"}
              type="text"
              placeholder="Name of Establishment"
            />
            <AddressAutoComplete />
            <DropDown
              label={"Type"}
              dropValue={typeValue}
              dropChange={handleTypeChange}
            >
              <MenuItem value={1}>Hotel</MenuItem>
              <MenuItem value={2}>B&B</MenuItem>
              <MenuItem value={3}>Guesthouse</MenuItem>
            </DropDown>
            <TextField
              id="about"
              label="About"
              multiline
              rows={6}
              type="text"
              placeholder="Describe your establishment by a glance..."
            />
            <TextField
              label={"Price per night"}
              id="price"
              variant={"outlined"}
              type="number"
              placeholder="NOK"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6);
              }}
            />
            <BreakfastIncluded />
            <FormControl>
              <FormLabel id="breakfast-row-radio-buttons-group-label">
                Star Rating
              </FormLabel>
              <AddStarRating />
            </FormControl>
            <FormGroup>
              <Heading level={3}>TripAdvisor</Heading>
              <TextField
                label={"Tripadvisor Link"}
                id="tripadvisorlink"
                variant={"outlined"}
                type="url"
                placeholder="Https://..."
              />
            </FormGroup>
            <TextField
              label={"Tripadvisor Rating"}
              id="tripadvisorrating"
              variant={"outlined"}
              type="number"
              placeholder="Ex. 4.3"
            />
            <AddFacilities />
            <Heading level={2}>Images</Heading>
            <AddImages />
            <button type="submit" className="btn">Add</button>
          </InputsTheme>
        </Box>
      </OuterContainer>
    </Layout>
  );
};

export default AddEstablishment;
