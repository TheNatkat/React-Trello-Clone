import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import CheckListModel from "./CheckListModel";

const CheckList = ({ card, list }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Card.Body onClick={() => setModalShow(true)}>{card.name}</Card.Body>
      <CheckListModel
        show={modalShow}
        card={card}
        list={list}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default CheckList;
