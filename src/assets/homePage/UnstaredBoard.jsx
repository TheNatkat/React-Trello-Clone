import React from "react";
import Card from "react-bootstrap/Card";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const UnstaredBoard = ({ boards, handleStarClick }) => {
  return boards
    .filter((board) => !board.starred)
    .map((board) => {
      return (
        <div key={board.id} className="board-card">
          <Link to={`boarddata/${board.id}`}>
            <Card className="bg-dark text-white">
              {board.prefs.backgroundImage && (
                <Card.Img src={board.prefs.backgroundImage} alt="Card" />
              )}
              <Card.ImgOverlay className=" ">
                <Card.Title>{board.name} </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Link>
          <span onClick={() => handleStarClick(board.id)}>
            {board.starred ? <AiFillStar /> : <AiOutlineStar />}
          </span>
        </div>
      );
    });
};

export default UnstaredBoard;
