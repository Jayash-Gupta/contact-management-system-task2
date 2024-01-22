import React, { useState, useEffect } from "react";
import ContactRow from "./ContactRow";
import api from "../services/api";

const ContactList = ({ filter: { name, date, countryCode, phoneNumber } }) => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalC, setTotalC] = useState(10);
  const [error, setError] = useState("");

  const contactsPerPage = totalC;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const result = await api.getContacts(currentPage, contactsPerPage);
        console.log(result);
        setContacts(result.contacts);
        setTotalPages(result.totalPages);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchContacts();
  }, [currentPage, totalC]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredContacts = contacts.filter((contact) => {
    if (name && !contact.name.toLowerCase().includes(name.toLowerCase())) {
      return false;
    }

    // if (date && !contact.date.includes(date)) {
    //   return false;
    // }

    // if (countryCode && !contact.countryCode.includes(countryCode)) {
    //   return false;
    // }

    if (phoneNumber && !contact.phoneNumber.includes(phoneNumber)) {
      return false;
    }

    return true;
  });

  useEffect(() => {}, [filteredContacts]);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [totalC]);

  return (
    <div className="main">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact, index) => (
            <ContactRow key={contact._id} contact={contact} index={index} />
          ))}
        </tbody>
      </table>
      <div className="bottom">
        {totalPages > 1 && (
          <div className="tabs">
            {/* {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button key={page} onClick={() => handlePageChange(page)}>
                  {page}
                </button>
              )
            )} */}
            <h4>Page No. / {totalPages}</h4>
            <input
              type="number"
              className="pageno"
              placeholder="Page No."
              onChange={(e) => handlePageChange(e.target.value)}
            ></input>
          </div>
        )}
        <div className="perpage">
          <h4>Contacts/page:</h4>
          <input
            type="number"
            placeholder=""
            className="entry"
            onChange={(e) => setTotalC(e.target.value)}
          ></input>
        </div>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default ContactList;
