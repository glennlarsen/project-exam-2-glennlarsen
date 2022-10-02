import * as React from "react";
import Box from "@mui/material/Box";
import Heading from "components/typography/Heading";
import Modal from "@mui/material/Modal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Paragraph from "components/typography/Paragraph";

const MessageModal = ({ open, onClose, data }) => {
  const { name, email, phone, message } = data.attributes;
  return (
    <div>
      <Modal open={open} onClose={onClose} key={data.id}>
        <Box className="admin-modal">
          <CloseRoundedIcon onClick={onClose} className="modal-close" />
          <Heading level={2}>{name}</Heading>
          <span>
            <span className="admin-card__property">Email: </span>
            {email}
          </span>
          <span>
            <span className="admin-card__property">Phone: </span>
            {phone.length > 3 ? phone : "not provided"}
          </span>
          <Paragraph>
            <span className="admin-card__property">Message: </span>
            {message}
          </Paragraph>
        </Box>
      </Modal>
    </div>
  );
};

export default MessageModal;
