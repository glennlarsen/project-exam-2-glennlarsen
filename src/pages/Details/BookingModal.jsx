import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Heading from "components/typography/Heading";
import DropDown from "components/forms/Dropdown";
import RangeDatePicker from "components/forms/RangeDatePicker";
import Button from "components/forms/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InputsTheme from "components/forms/InputsTheme";
import TextField from "@mui/material/TextField";


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
  guests,
  onChange,
  dateChange,
  value,
}) => {

  const [textAreaValue, setTextAreaValue] = useState("");

  const handleChange = (event) => {
    setTextAreaValue(event.target.value);
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
          <Box sx={boxStyle} component="form">
            <CloseRoundedIcon onClick={onClose} sx={closeStyle} />
            <Heading level={3}>
              Send a booking request for Hotel Augustin
            </Heading>
            <InputsTheme>
              <TextField label={"Name"} variant={"outlined"} />
              <TextField label={"Email"} variant={"outlined"} type="email" />
              <TextField
                id="comment"
                label="Comment"
                multiline
                maxRows={4}
                value={textAreaValue}
                onChange={handleChange}
                placeholder="optional"
              />
            </InputsTheme>
            <RangeDatePicker value={value} onChange={dateChange} />
            <DropDown guests={guests} onChange={onChange} />
            <Button>Send</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default BookingModal;
