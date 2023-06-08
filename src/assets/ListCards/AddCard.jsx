import axios from "axios";
import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Auth from "../Database-Token/Access";

const AddCard = ({ list, cards, setCards }) => {
  async function postAddNewCard(name) {
    try {
      const res = await axios.post(
        `https://api.trello.com/1/cards?idList=${list.id}&key=${Auth.key}&token=${Auth.token}`,
        { name: name }
      );
      setCards([...cards, res.data]);
    } catch (e) {
      console.error("Failed to Post New Card", e);
    }
  }

  function handleNewCardClick(e) {
    if (e.key === "Enter") {
      postAddNewCard(e.target.value);
    }
    if (e.keyCode == 27) {
      e.target.value = "";
    }
  }

  return (
    <FloatingLabel
      controlId="floatingInput"
      label="Add a card"
      className="mb-3"
      onKeyDown={(e) => handleNewCardClick(e)}
    >
      <Form.Control type="type" placeholder="name@example.com" />
    </FloatingLabel>
  );
};

export default AddCard;
