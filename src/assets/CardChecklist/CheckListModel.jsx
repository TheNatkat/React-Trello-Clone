import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FcTodoList } from "react-icons/fc";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import CloseButton from "react-bootstrap/CloseButton";
import Auth from "../Database-Token/Access";
import CheckListItem from "../ListChecklist/CheckItem";

const CheckListModel = (props) => {
  const [allCheckList, setAllCheckList] = useState([]);
  const [flipAddBtn, setFlipAddBtn] = useState(false);

  useEffect(() => {
    getAllTheCheckList();
  }, []);

  async function getAllTheCheckList() {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/cards/${props.card.id}/checklists?key=${Auth.key}&token=${Auth.token}`
      );
      setAllCheckList(res.data);
    } catch (e) {
      console.error("Failed to Get ALl Checklist", e);
    }
  }

  async function postAddnewCheckList(name) {
    try {
      const resp = await axios.post(
        `https://api.trello.com/1/cards/${props.card.id}/checklists?key=${Auth.key}&token=${Auth.token}`,
        { name: name }
      );
      setAllCheckList([...allCheckList, resp.data]);
    } catch (e) {
      console.error("Couldn't get board", e);
    }
  }

  async function deleteCheckList(CheckList) {
    try {
      await axios.delete(
        `https://api.trello.com/1/cards/${props.card.id}/checklists/${CheckList.id}?key=${Auth.key}&token=${Auth.token}`
      );
      setAllCheckList(allCheckList.filter((list) => list.id !== CheckList.id));
    } catch (e) {
      console.error("Failed to Delete Checklist", e);
    }
  }

  function handleNewCheckList(e) {
    if (e.key === "Enter") {
      setFlipAddBtn(!flipAddBtn);
      postAddnewCheckList(e.target.value);
    }
    if (e.keyCode == 27) {
      setCreateNew(false);
      e.target.value = "";
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="check-list-heading">
            <FcTodoList />
            <h4>
              {props.card.name} <span>{`in ${props.list.name}`}</span>
            </h4>
          </div>
        </Modal.Title>
      </Modal.Header>
      <div className="all-checklist">
        {allCheckList.map((checkList) => {
          return (
            <Card key={checkList.id}>
              <Card.Header>
                {checkList.name}
                <CloseButton onClick={() => deleteCheckList(checkList)} />
              </Card.Header>
              <CheckListItem checkList={checkList} />
            </Card>
          );
        })}
      </div>
      <Modal.Body>
        <div className="d-grid gap-2">
          {flipAddBtn && (
            <FloatingLabel
              controlId="floatingInput"
              label="Enter checklist name"
              className="mb-3"
              onKeyDown={(e) => handleNewCheckList(e)}
            >
              <Form.Control type="text" placeholder="name@example.com" />
            </FloatingLabel>
          )}

          {!flipAddBtn && (
            <Button
              onClick={() => setFlipAddBtn(!flipAddBtn)}
              variant="secondary"
              size="lg"
            >
              Add a CheckList
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CheckListModel;
