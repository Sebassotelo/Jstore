import React from "react";
import "./cliente.css";
import { useNavigate } from "react-router-dom";

function Cliente() {
  const navigate = useNavigate();
  return (
    <div className="cliente">
      <p onClick={() => navigate("SrasMedias")} className="cliente__title">
        <p>IR AL CATALOGO</p>
      </p>

      <div onClick={() => navigate("SrasMedias")} className="cliente__img">
        <img src="https://i.imgur.com/AOjZcSv.jpg" alt="" />
      </div>

      <div className="cliente__info" onClick={() => navigate("SrasMedias")}>
        <h3>🛸 E S T A M O S EN EL F U T U R O</h3>
      </div>
    </div>
  );
}

export default Cliente;
