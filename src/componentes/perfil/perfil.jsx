import React from "react";
import "./perfil.css";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";

function Perfil() {
  return (
    <div className="perfil" id="perfil">
      <div className="logoUsuario">
        <div className="logo"></div>
        <h1 className="usuario">@eldev</h1>
      </div>

      <p className="direccion">Santa fe 326. Corrientes, Argentina</p>
      <div className="redes">
        <a href="">
          <FaWhatsapp className="redes__icon" />
        </a>
        <a href="">
          <FaInstagram className="redes__icon" />
        </a>
        <a href="">
          <FaMapMarkerAlt className="redes__icon" />
        </a>
      </div>
    </div>
  );
}

export default Perfil;
