import { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../Database-Token/Access";
import Boards from "./Boards";

export default function Home() {
  const [boards, setBoard] = useState([]);
  useEffect(() => {
    getAllBoards();
  }, []);

  async function getAllBoards() {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/members/me/boards?&key=${Auth.key}&token=${Auth.token}`
      );
      setBoard(res.data);
    } catch (e) {
      console.error("Get all boards failed", e);
    }
  }

  return (
    <>
      <Boards boards={boards} setBoard={setBoard} />
    </>
  );
}
