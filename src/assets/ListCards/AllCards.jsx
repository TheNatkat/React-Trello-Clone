import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import CheckList from "../CardChecklist/CheckList";
import Auth from "../Database-Token/Access";
import AddCard from "./AddCard";

const AllCards = ({ list }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getAllCardApi(list.id);
  }, []);

  async function getAllCardApi(listId) {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/lists/${listId}/cards?key=${Auth.key}&token=${Auth.token}`
      );
      setCards(res.data);
    } catch (e) {
      console.error("Failed to Get All Card", e);
    }
  }

  async function deleteCardApi(cardId) {
    try {
      setCards(cards.filter((card) => card.id !== cardId));
      await axios.delete(
        `https://api.trello.com/1/cards/${cardId}?key=${Auth.key}&token=${Auth.token}`
      );
    } catch (e) {
      console.error("Failed to delete Card", e);
    }
  }

  return (
    <>
      {cards.map((card) => {
        return (
          <Card key={card.id} id="card-info">
            <CheckList card={card} list={list} />
            <CloseButton onClick={() => deleteCardApi(card.id)} />
          </Card>
        );
      })}
      <AddCard cards={cards} setCards={setCards} list={list} />
    </>
  );
};

export default AllCards;
