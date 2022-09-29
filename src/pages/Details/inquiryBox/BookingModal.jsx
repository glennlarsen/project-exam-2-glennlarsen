import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Heading from "components/typography/Heading";
import DropDown from "components/forms/Dropdown";
import RangeDatePicker from "components/forms/RangeDatePicker";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InputsTheme from "components/forms/InputsTheme";
import TextField from "@mui/material/TextField";
import schema from "pages/Contact/schemaContact";
import { yupResolver } from "@hookform/resolvers/yup";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import MenuItem from "@mui/material/MenuItem";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  width: "95%",
  bgcolor: "background.paper",
  borderRadius: "12px",
  gap: 2,
  boxShadow: 24,
  p: 4,
};

const closeStyle = {
  position: "absolute",
  right: 15,
  top: 15,
  cursor: "pointer",
};

const BookingModal = ({
  open,
  onClose,
  label,
  dateChange,
  value,
  title,
  dropValue,
  dropChange,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit() {
    setSubmitted(true);
    reset();
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={boxStyle}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <CloseRoundedIcon onClick={onClose} sx={closeStyle} />
            <Heading level={3}>Send a booking request for {title}</Heading>
            <InputsTheme>
              <TextField
                label={"Name"}
                id="name"
                variant={"outlined"}
                type="text"
                {...register("name")}
                error={Boolean(errors.name)}
                helperText={errors.name ? errors.name.message : ""}
                InputProps={
                  errors.name
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
                label={"Email"}
                id="email"
                variant={"outlined"}
                type="email"
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : ""}
                InputProps={
                  errors.email
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
                id="comment"
                label="Comment"
                multiline
                maxRows={4}
                type="text"
                placeholder="optional"
              />
            </InputsTheme>
            <RangeDatePicker value={value} onChange={dateChange} />
            <DropDown dropValue={dropValue} dropChange={dropChange} label={label}>
              <MenuItem value={1}>1 guest</MenuItem>
              <MenuItem value={2}>2 guests</MenuItem>
              <MenuItem value={3}>3 guests</MenuItem>
              <MenuItem value={4}>4 guests</MenuItem>
            </DropDown>
            <button type="submit" className="btn">
              Send
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default BookingModal;
