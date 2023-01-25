import React from "react";
import "./cliente.css";
import { useNavigate } from "react-router-dom";

function Cliente() {
  const navigate = useNavigate();
  return (
    <div className="cliente">
      <a
        href="https://www.jStore.com.ar/SrasMedias"
        className="cliente__title"
        target={"_blank"}
      >
        <p>Tienda de Sras Medias</p>
      </a>

      <a href="https://www.jStore.com.ar/SrasMedias" className="cliente__img">
        <img src="https://i.imgur.com/AOjZcSv.jpg" alt="" />
      </a>

      <div className="cliente__info">
        <h3>🛸 E S T A M O S EN EL F U T U R O</h3>
      </div>
    </div>
  );
}

export default Cliente;
