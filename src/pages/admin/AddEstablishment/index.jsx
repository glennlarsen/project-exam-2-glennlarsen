import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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
import MenuItem from "@mui/material/MenuItem";
import { Controller } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@mui/material/FormGroup";
import AddStarRating from "./AddStarRating";
import BreakfastIncluded from "./BreakfastIncluded";
import AddImages from "./AddImages";
import AuthContext from "utils/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MyLoader from "components/layout/MyLoader";
import PostApi from "utils/PostApi";
import ReactHookFormSelect from "components/forms/ReactHookFormSelect";
import AddressAutoComplete from "./AddressAutoComplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Unstable_Grid2";
import useApi from "utils/useApi";
import { BASE_URL, FACILITIES } from "utils/api";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Please enter a title")
    .min(4, "Minimum 4 Characters"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Please enter a price")
    .min(100, "Minimum 100 NOK"),
  about: yup
    .string()
    .required("Please write an about text")
    .min(10, "Minimum 10 Characters"),
  address: yup.string().required("Please enter an address"),
  breakfast: yup.boolean().required("Please select yes or no"),
  starsRating: yup.number("Please select how many stars"),
  tripadvisorlink: yup.string(),
  rating: yup.number().notRequired().nullable(),
  facilities: yup.array().nullable(),
  images: yup.mixed().test("Required", "Please select at least one image", (value) => {
    return value && value.length;
  }),
});

const AddEstablishment = () => {
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [error, setError] = useState(false);

  const [auth] = useContext(AuthContext);

  const addressRef = AddressAutoComplete();

  const url = BASE_URL + FACILITIES;
  const { facilities } = useApi(url);
  const [showAllFacilities, setShowAllFacilities] = useState(false);

  const toogleAllFacilities = (event) => {
    setShowAllFacilities((current) => !current);
  };

  const navigate = useNavigate();
  if (!auth) {
    navigate("/login");
  }

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const watchAllFields = watch();
  console.log(watchAllFields);

  async function onSubmit(data) {
    const createEstablishment = window.confirm(
      "This will create this accommodation. Are you sure you want to to that?"
    );

    if (createEstablishment) {
      setLoading(true);
      const create = await PostApi(data, auth.jwt);
      console.log("upload succes:", create.success);
      if (create.success) {
        setLoading(false);
        setCreated(true);
        reset();
				navigate("/establishments");
      }
      if (!create) {
        setLoading(false);
        setCreated(false);
        setError(true);
      }
    }
  }

  if (loading) {
    return <><span>Uploading images, Please wait...</span><MyLoader /></>;
  }

  if (error) {
    return <div>An error occured</div>;
  }

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
        <InputsTheme>
          <Box
            className="addestablishment__container"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
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
            <div className="breakfast-star__container">
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
                setValueAs: (v) => (v === "" ? null : parseInt(v)),
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
                showAllFacilities ? "add__facilities--show" : ""
              } add__facilities`}
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
                className="add__facilities--expand"
                onClick={toogleAllFacilities}
              >
                <FontAwesomeIcon icon={faChevronDown} size="1x" />
                More Facilities
              </span>
            ) : (
              <span
                className="add__facilities--expand"
                onClick={toogleAllFacilities}
              >
                <FontAwesomeIcon icon={faChevronUp} size="1x" />
                Less Facilities
              </span>
            )}
            <Heading level={2}>Images</Heading>
            <AddImages
              setValue={setValue}
							register={register}
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
