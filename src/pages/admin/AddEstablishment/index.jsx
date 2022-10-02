import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import styles from "./addestablishment.module.scss";
import schemaAddEstablishment from "./schemaAddEstablishment";
import AddressAutoComplete from "./AddressAutoComplete";
import AddStarRating from "./AddStarRating";
import BreakfastIncluded from "./BreakfastIncluded";
import AddImages from "./AddImages";
import PostEstablishment from "utils/PostEstablishment";
import AuthContext from "utils/AuthContext";
import useApi from "utils/useApi";
import { BASE_URL, FACILITIES } from "constants/apiKeys";

import Layout from "components/layout/Layout";
import OuterContainer from "components/layout/OuterContainer";
import Head from "components/layout/Head";
import Heading from "components/typography/Heading";
import AdminHeader from "components/admin/AdminHeader";
import AlertMessage from "components/forms/AlertMessage";
import InputsTheme from "components/forms/InputsTheme";
import MyLoader from "components/layout/MyLoader";
import ReactHookFormSelect from "components/forms/ReactHookFormSelect";

import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Unstable_Grid2";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const AddEstablishment = () => {
  const [auth] = useContext(AuthContext);
  const navigate = useNavigate();
  if (!auth) {
    navigate("/login");
  }

  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [error, setError] = useState(false);
  const addressRef = AddressAutoComplete();
  const url = BASE_URL + FACILITIES;
  const { facilities } = useApi(url);
  const [showAllFacilities, setShowAllFacilities] = useState(false);

  const toogleAllFacilities = (event) => {
    setShowAllFacilities((current) => !current);
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaAddEstablishment) });

  async function onSubmit(data) {
    const createEstablishment = window.confirm(
      "This will create this establishment. Are you sure you want to to that?"
    );

    if (createEstablishment) {
      setLoading(true);
      const create = await PostEstablishment(data, auth.jwt);
      if (create.success) {
        setLoading(false);
        setCreated(true);
        reset();
        setTimeout(() => {
          navigate("/establishments");
          window.location.reload(true);
        }, 3000);
      }
      if (!create) {
        setLoading(false);
        setCreated(false);
        setError(true);
      }
    }
  }

  if (loading) {
    return (
      <MyLoader height="100vh">
        {" "}
        It may take a few seconds to upload the images, please wait...
      </MyLoader>
    );
  }

  if (error) {
    return (
      <AlertMessage
        variant="error"
        title="Error"
        message="An error occured, Please try again later"
      />
    );
  }

  return (
    <Layout>
      <Head
        page="Admin - Add Establishment"
        description="Holidaze Admin - Add a new establishment to your collection"
      />
      <OuterContainer>
        <AdminHeader
          heading="Add New Establishment"
          icon={<ArrowBackIcon />}
          iconToolTip="Go Back"
          iconLink="/establishments"
        />
        <InputsTheme>
          <Box
            className={styles.container}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {created && (
              <AlertMessage
                variant="success"
                message="Establishment successfully created! Redirecting you to
              establishments now..."
              />
            )}
            <Heading level={2}>Details</Heading>
            <TextField
              label={"Title"}
              id="title"
              variant={"outlined"}
              type="text"
              placeholder="Name of Establishment"
              {...register("title")}
              error={Boolean(errors.title)}
              helperText={errors.title ? errors.title.message : ""}
              InputProps={
                errors.title
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <ErrorRoundedIcon color="error" />
                        </InputAdornment>
                      ),
                    }
                  : null
              }
            />
            <FormControl>
              <Controller
                render={({ fieldState: { error } }) => {
                  return (
                    <TextField
                      inputRef={addressRef}
                      error={!!error}
                      autoComplete="off"
                      helperText={error?.message}
                      placeholder="Street address..."
                      {...register("address")}
                      InputProps={
                        error
                          ? {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <ErrorRoundedIcon color="error" />
                                </InputAdornment>
                              ),
                            }
                          : null
                      }
                    />
                  );
                }}
                name="address"
                control={control}
                defaultValue={""}
              />
            </FormControl>
            <ReactHookFormSelect
              id="type"
              label="Type"
              name="type"
              control={control}
              defaultValue="hotel"
            >
              <MenuItem value="hotel">Hotel</MenuItem>
              <MenuItem value="b&b">B&B</MenuItem>
              <MenuItem value="guesthouse">Guesthouse</MenuItem>
            </ReactHookFormSelect>
            <TextField
              id="about"
              label="About"
              multiline
              rows={6}
              type="text"
              placeholder="Describe your establishment by a glance..."
              {...register("about")}
              error={Boolean(errors.about)}
              helperText={errors.about ? errors.about.message : ""}
              InputProps={
                errors.about
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <ErrorRoundedIcon color="error" />
                        </InputAdornment>
                      ),
                    }
                  : null
              }
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
              {...register("price")}
              error={Boolean(errors.price)}
              helperText={errors.price ? errors.price.message : ""}
              InputProps={
                errors.price
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <ErrorRoundedIcon color="error" />
                        </InputAdornment>
                      ),
                    }
                  : null
              }
            />
            <div className={styles.breakfaststarContainer}>
              <BreakfastIncluded
                control={control}
                name="breakfast"
                defaultValue={true}
              />
              <AddStarRating control={control} />
            </div>
            <FormGroup>
              <Heading level={3}>TripAdvisor</Heading>
              <TextField
                label={"Tripadvisor Link"}
                id="tripadvisorlink"
                variant={"outlined"}
                type="url"
                placeholder="Https://..."
                {...register("tripadvisorlink")}
                error={Boolean(errors.tripadvisorlink)}
                helperText={
                  errors.tripadvisorlink ? errors.tripadvisorlink.message : ""
                }
                InputProps={
                  errors.tripadvisorlink
                    ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            <ErrorRoundedIcon color="error" />
                          </InputAdornment>
                        ),
                      }
                    : null
                }
              />
            </FormGroup>
            <TextField
              label={"Tripadvisor Rating"}
              id="tripadvisorrating"
              variant={"outlined"}
              type="number"
              placeholder="Ex. 4.3"
              {...register("rating", {
                setValueAs: (v) => (v === "" ? null : parseFloat(v).toFixed(1)),
              })}
              error={Boolean(errors.rating)}
              helperText={errors.rating ? errors.rating.message : ""}
              InputProps={
                errors.rating
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <ErrorRoundedIcon color="error" />
                        </InputAdornment>
                      ),
                    }
                  : null
              }
            />
            <FormGroup
              className={`${
                showAllFacilities ? styles.addFacilitiesShow : ""
              } ${styles.addFacilities}`}
            >
              <Heading level={2}>Facilities</Heading>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                {facilities.map((facility) => {
                  const { name, tags } = facility.attributes;
                  return (
                    <FormControlLabel
                      sx={{ minWidth: "170px" }}
                      key={facility.id}
                      id={tags}
                      name={`facilities[${facility.id}]`}
                      value={facility.id}
                      control={<Checkbox />}
                      label={name}
                      {...register("facilities")}
                    />
                  );
                })}
              </Grid>
            </FormGroup>
            {!showAllFacilities ? (
              <span
                className={styles.addFacilitiesExpand}
                onClick={toogleAllFacilities}
              >
                <FontAwesomeIcon icon={faChevronDown} size="1x" />
                More Facilities
              </span>
            ) : (
              <span
                className={styles.addFacilitiesExpand}
                onClick={toogleAllFacilities}
              >
                <FontAwesomeIcon icon={faChevronUp} size="1x" />
                Less Facilities
              </span>
            )}
            <Heading level={2}>Images</Heading>
            <AddImages
              setValue={setValue}
              errors={errors}
              name="images"
              id="images"
            />
            <button type="submit" className="btn btn-form">
              Add
            </button>
          </Box>
        </InputsTheme>
      </OuterContainer>
    </Layout>
  );
};

export default AddEstablishment;
