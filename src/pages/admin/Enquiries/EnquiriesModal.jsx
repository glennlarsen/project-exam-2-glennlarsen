import * as React from "react";
import Heading from "components/typography/Heading";
import Paragraph from "components/typography/Paragraph";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const EnquiriesModal = ({ open, onClose, data, formatDate }) => {
  const { name, email, checkin, checkout, guests, comment, price, days } = data.attributes;
  console.log(data)
  const establishment = data.attributes.establishment.data.attributes.title;

  return (
    <div>
      <Modal open={open} onClose={onClose} key={data.id}>
        <Box className="admin-modal">
          <CloseRoundedIcon onClick={onClose} className="modal-close" />
          <Heading level={2}>{establishment}</Heading>
          <span>
            <span className="admin-card__property">Name: </span>
            {name}
          </span>
          <span>
            <span className="admin-card__property">Email: </span>
            {email}
          </span>
          <span>
            <span className="admin-card__property">Check-in: </span>
            {formatDate(checkin)}
          </span>
          <span>
            <span className="admin-card__property">Checkout: </span>
            {formatDate(checkout)}
          </span>
          <span>
            <span className="admin-card__property">Guests: </span>
            {guests}
          </span>
          <span>
            <span className="admin-card__property">Totalprice: </span>
            {parseInt(price).toLocaleString().replace(/,/g, " ")} NOK ({days} Nights)
          </span>
          <Paragraph>
            <span className="admin-card__property">Comment: </span>
            {comment.length > 0 ? comment : "no comment"}
          </Paragraph>
        </Box>
      </Modal>
    </div>
  );
};

export default EnquiriesModal;
