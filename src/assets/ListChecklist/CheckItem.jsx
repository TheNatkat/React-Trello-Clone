import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Auth from "../Database-Token/Access";
import CloseButton from "react-bootstrap/CloseButton";
import ProgressBar from "react-bootstrap/ProgressBar";
import AddCheckItem from "./AddCheckItem";

const CheckListItem = ({ checkList }) => {
  const [allCheckItems, setAllcheckItem] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [checkedItem, setcheckedItem] = useState(0);

  useEffect(() => {
    getALlCheckItems();
  }, [refreshPage]);

  async function getALlCheckItems() {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/checklists/${checkList.id}/checkItems?key=${Auth.key}&token=${Auth.token}`
      );

      let count = 0;
      res.data.forEach((checkItem) => {
        if (checkItem.state === "complete") {
          count++;
        }
      });

      setcheckedItem(count);
      setAllcheckItem(res.data);
    } catch (e) {
      console.error("Failed to post new CheckList Item", e);
    }
  }

  async function updateCheckItems(idCheckItem, status) {
    try {
      await axios.put(
        `https://api.trello.com/1/cards/${checkList.idCard}/checkItem/${idCheckItem}?key=${Auth.key}&token=${Auth.token}`,
        { state: `${status}` }
      );
      setRefreshPage(!refreshPage);
    } catch (e) {
      console.error("Failed to Update CheckList Item", e);
    }
  }

  async function deleteCheckItemApi(id) {
    try {
      await axios.delete(
        `https://api.trello.com/1/checklists/${checkList.id}/checkItems/${id}?key=${Auth.key}&token=${Auth.token}`
      );
      setAllcheckItem(allCheckItems.filter((checkItem) => checkItem.id !== id));
    } catch (e) {
      console.error("Failed to Delete new CheckList Item", e);
    }
  }

  function handleCheckItem(checkListId) {
    const updatedCheckItems = allCheckItems.map((checkItem) => {
      if (checkItem.id === checkListId) {
        const updatedState =
          checkItem.state === "complete" ? "incomplete" : "complete";
        updateCheckItems(checkListId, updatedState);
        return {
          ...checkItem,
          state: updatedState,
        };
      }
      return checkItem;
    });
    setAllcheckItem(updatedCheckItems);
  }

  return (
    <Card.Body>
      <Card.Title>
        <ProgressBar
          animated
          now={(checkedItem / allCheckItems.length) * 100}
        />
        {allCheckItems.map((checkItem) => {
          return (
            <div key={checkItem.id} className="checkitem-ele">
              <label className="checkitem" htmlFor={checkItem.id}>
                <input
                  type="checkbox"
                  id={checkItem.id}
                  onClick={() => handleCheckItem(checkItem.id)}
                  defaultChecked={checkItem.state === "complete"}
                />
                <h5>{checkItem.name}</h5>
              </label>
              <CloseButton onClick={() => deleteCheckItemApi(checkItem.id)} />
            </div>
          );
        })}
      </Card.Title>
      <AddCheckItem
        allCheckItems={allCheckItems}
        setAllcheckItem={setAllcheckItem}
        checkList={checkList}
      />
    </Card.Body>
  );
};

export default CheckListItem;
