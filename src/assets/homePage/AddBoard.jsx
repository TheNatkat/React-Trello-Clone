import axios from "axios";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Auth from "../Database-Token/Access";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const AddBoard = ({ boards, setBoard }) => {
  const [createNew, setCreateNew] = useState(false);

  function handleNameEnter(e) {
    if (e.key === "Enter") {
      setCreateNew(false);
      addNewBoard(e.target.value);
    }
    if (e.keyCode == 27) {
      setCreateNew(false);
      e.target.value = "";
    }
  }

  async function addNewBoard(name) {
    try {
      const res = await axios.post(
        `https://api.trello.com/1/boards/?name=${name}&key=${Auth.key}&token=${Auth.token}`
      );
      setBoard([...boards, res.data]);
    } catch (e) {
      console.error("add new board failed", e);
    }
  }
  return (
    <Card className="bg-dark text-white" onClick={() => setCreateNew(true)}>
      <Card.ImgOverlay id="add-board" className=" ">
        {!createNew && <Card.Text>Create new Board</Card.Text>}
        {!createNew && <Card.Text>{10 - boards.length} left</Card.Text>}
        {createNew && (
          <>
            <h6> Type name of Board</h6>
            <FloatingLabel
              controlId="floatingInput"
              label="Name"
              className="mb-3"
              onKeyDown={(e) => handleNameEnter(e)}
            >
              <Form.Control type="type" placeholder="name@example.com" />
            </FloatingLabel>
          </>
        )}
      </Card.ImgOverlay>
    </Card>
  );
};

export default AddBoard;
