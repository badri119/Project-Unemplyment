import React, { useState } from "react";
import "./Player.css";

const Player = ({ name, symbol, isActive, handleNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(name);

  const handleClick = () => {
    //updating state based on a previous state value (best practice)
    setIsEditing((editing) => !editing);

    if (isEditing) {
      handleNameChange(symbol, user);
    }
  };

  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {isEditing === false ? (
            <span className="player-name">{user}</span>
          ) : (
            <input
              maxLength={10}
              type="text"
              required
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            ></input>
          )}

          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  );
};

export default Player;
