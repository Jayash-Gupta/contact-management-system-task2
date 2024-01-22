import React from "react";

const ContactRow = ({ contact, index }) => {
  css = index % 2 == 0 ? "" : "#C5C6D0";
  return (
    <tr style={{ background: css }}>
      <td>{contact.name}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
    </tr>
  );
};

export default ContactRow;
