import axios from "axios";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Auth from "../Database-Token/Access";

const AddList = ({ allList, setAllList, currentBoardId }) => {
  const [flipAddlist, setflipAddlist] = useState(false);
  async function postNewListApi(name) {
    try {
      const res = await axios.post(
        `https://api.trello.com/1/boards/${currentBoardId}/lists?name=${name}&key=${Auth.key}&token=${Auth.token}`
      );
      setAllList([...allList, res.data]);
    } catch (e) {
      console.error("Post Failed for New List", e);
    }
  }

  function handleEnterNewList(e) {
    if (e.key === "Enter") {
      setflipAddlist(false);
      postNewListApi(e.target.value);
    }
    if (e.keyCode == 27) {
      setflipAddlist(false);
      e.target.value = "";
    }
  }

  return (
    <>
      {!flipAddlist && (
        <Card.Title>
          <h5 id="add-list" onClick={() => setflipAddlist(true)}>
            {`+ Add another list`}
          </h5>
        </Card.Title>
      )}
      {flipAddlist && (
        <>
          <h6>Name of New List</h6>
          <FloatingLabel
            label="List Name"
            className="mb-3"
            onKeyDown={(e) => handleEnterNewList(e)}
          >
            <Form.Control
              id="checklist-input"
              type="text"
              placeholder="name@example.com"
            />
          </FloatingLabel>
        </>
      )}
    </>
  );
};

export default AddList;
