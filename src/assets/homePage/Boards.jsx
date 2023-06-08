import React from "react";
import { AiOutlineStar, AiOutlineUser } from "react-icons/ai";

import AddBoard from "./AddBoard";
import StaredBoard from "./StaredBoard";
import UnstaredBoard from "./UnstaredBoard";

const Boards = ({ boards, setBoard }) => {
  function handleStarClick(id) {
    setBoard(() =>
      boards.map((board) => {
        if (board.id === id) {
          board.starred
            ? (board = { ...board, starred: false })
            : (board = { ...board, starred: true });
        }
        return board;
      })
    );
  }

  return (
    <div className="all-boards">
      <div className="starred">
        <h1>
          <AiOutlineStar /> Starred boards
        </h1>
        <div className="boards">
          <StaredBoard boards={boards} handleStarClick={handleStarClick} />
        </div>
      </div>
      <div className="unstarred">
        <h1>
          <AiOutlineUser /> Your boards
        </h1>
        <div className="boards">
          <UnstaredBoard boards={boards} handleStarClick={handleStarClick} />
          <AddBoard boards={boards} setBoard={setBoard} />
        </div>
      </div>
    </div>
  );
};

export default Boards;
