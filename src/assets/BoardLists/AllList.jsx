import React from "react";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import AllCards from "../ListCards/AllCards";
import axios from "axios";
import Auth from "../Database-Token/Access";

const AllList = ({ allList, setAllList }) => {
  async function deleteListApi(id) {
    try {
      setAllList(allList.filter((list) => list.id !== id));
      await axios.put(
        `https://api.trello.com/1/lists/${id}/closed?key=${Auth.key}&token=${Auth.token}`,
        {
          value: true,
        }
      );
    } catch (e) {
      console.error("Failde to Delete List", e);
    }
  }

  return allList.map((list) => {
    return (
      <Card key={list.id}>
        <Card.Body>
          <Card.Title id="card-name-box">
            <h5>{list.name}</h5>
            <CloseButton
              id="list-close-btn"
              onClick={() => deleteListApi(list.id)}
            />
          </Card.Title>
          <div className="add-card">
            <AllCards list={list} />
          </div>
        </Card.Body>
      </Card>
    );
  });
};

export default AllList;
