import axios from "axios";
import React from "react";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Auth from "../Database-Token/Access";

const AddCheckItem = ({ allCheckItems, setAllcheckItem, checkList }) => {
  async function postNewCheckItem(name) {
    try {
      const res = await axios.post(
        `https://api.trello.com/1/checklists/${checkList.id}/checkItems?name=${name}&key=${Auth.key}&token=${Auth.token}`
      );
      setAllcheckItem([...allCheckItems, res.data]);
    } catch (e) {
      console.error("Failed to post new CheckList Item", e);
    }
  }

  function addCheckItem(e) {
    if (e.key === "Enter") {
      postNewCheckItem(e.target.value);
    }
    if (e.key == 27) {
      e.target.value = "";
    }
  }
  return (
    <FloatingLabel
      label="Enter checkItem name"
      className="mb-3"
      onKeyDown={(e) => addCheckItem(e)}
    >
      <Form.Control
        id="checklist-input"
        type="text"
        placeholder="name@example.com"
      />
    </FloatingLabel>
  );
};

export default AddCheckItem;
