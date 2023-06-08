import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Auth from "../Database-Token/Access";
import AllList from "./AllList";
import AddList from "./AddList";

const Lists = () => {
  const [allList, setAllList] = useState([]);
  const currentBoardId = useParams().id;
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    getAllListsApi(currentBoardId);
    getAllBoardsBackground();
  }, []);

  async function getAllBoardsBackground() {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/members/me/boards?&key=${Auth.key}&token=${Auth.token}`
      );
      setBackgroundImage(
        res.data.reduce(
          (acc, board) =>
            board.id === currentBoardId
              ? (acc = board.prefs.backgroundImage)
              : acc,
          ""
        )
      );
    } catch (e) {
      console.error("Failed to Get all Boards ", e);
    }
  }

  async function getAllListsApi(id) {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/boards/${id}/lists?key=${Auth.key}&token=${Auth.token}`
      );
      setAllList(res.data);
    } catch (e) {
      console.error("Failed to Get all List", e);
    }
  }

  return (
    <div
      className="all-list"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <AllList allList={allList} setAllList={setAllList} />
      <Card className="add-list">
        <Card.Body>
          <AddList
            allList={allList}
            setAllList={setAllList}
            currentBoardId={currentBoardId}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Lists;
