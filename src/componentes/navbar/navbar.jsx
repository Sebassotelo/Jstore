import React, { useState, useContext, useEffect, useRef } from "react";
import "./navbar.css";
import CarroContext from "../../context/carro/carroContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const context = useContext(CarroContext);
  const { setUser } = useContext(CarroContext);

  const googleProvider = new GoogleAuthProvider();

  return (
    <div className={context.user ? "navbar" : "navbar__none"}>
      <div className="navbar__img">
        {/* <img src={context.user.photoURL} alt="" /> */}
        <p>{context.user ? context.user.displayName : ""}</p>
      </div>
      <ul className="botonera">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate(`/${context.usuario}`)}>Menu</li>
        <li onClick={() => navigate("/account")}>Mi Cuenta</li>
        <li onClick={() => signOut(context.auth)}>Cerrar Sesion</li>
      </ul>
    </div>
  );
}

export default Navbar;
