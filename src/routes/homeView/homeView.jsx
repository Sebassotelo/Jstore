import React, { useState, useContext, useEffect, useRef } from "react";
import "./homeView.css";
import CarroContext from "../../context/carro/carroContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { Link, animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../../componentes/navbar/navbar";
import NavbarMobile from "../../componentes/navbarMobile/navbarMobile";
import Tarjeta from "../../componentes/tarjeta/tarjeta";
import Cliente from "../../componentes/cliente/cliente";
import NavbarNoAuth from "../../componentes/navbarNoAuth/navbarNoAuth";

function HomeView() {
  const navigate = useNavigate();
  const [estaRegistrandose, setEstaRegistrandose] = useState(false);

  const context = useContext(CarroContext);
  const { setUser, setEstadoUsuario } = useContext(CarroContext);

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    setEstadoUsuario(0);
    onAuthStateChanged(context.auth, inspectorSesion);
    console.log("estado usuario", context.estadoUsuario);
    document.title = "SrasMedias";
    window.scroll(0, 0);
  }, []);

  const inspectorSesion = (usuarioFirebase) => {
    //en caso de que haya seison iniciada
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
      setEstadoUsuario(1);
      if (context.usuario !== "generico") {
        setEstadoUsuario(2);
      }
    } else {
      //en caso de que haya seison iniciada
      setUser(null);
      setEstadoUsuario(0);
    }
  };

  const premiumDesc = [
    { text: "Poder subir la foto del Producto" },
    { text: "Personalizacion de Fondo de menu" },
    { text: "Personalizacion de Colores del Menu" },
  ];

  /*

  ESTADO CLIENTE
  0 = No esta Auth
  1 = Authenticado pero no creo nombre de usuario
  2 = Auth y creo nombre de usuario
  3 = Todo el 2 y completo la seccion perfil.
  4 = Usuario Premium
  */

  return (
    <div className="home">
      {/* {context.estadoUsuario > 0 ?  : ""} */}

      {context.estadoUsuario === 0 ? (
        <NavbarNoAuth />
      ) : (
        <>
          <Navbar />
          <NavbarMobile />
        </>
      )}

      <section id="header" className="home__header">
        <div className="header__container">
          <div className="header__title">
            <div className="title__div">
              <img
                className="title__img"
                src="https://i.imgur.com/Us77N0f.png"
                alt=""
              />
            </div>
            <p className="title__p"> 🛸 E S T A M O S EN EL F U T U R O</p>
            <p className="title__p"> ⚡P I C K U P ⚡</p>

            <p
              className="title__catalogo"
              onClick={() => navigate("/SrasMedias")}
            >
              IR AL CATALOGO
            </p>
          </div>
          {/* <div className="header__img">
            <img src="https://i.imgur.com/DYPel8f.png" alt="" />
          </div> */}
        </div>
      </section>

      <section id="about" className="home__about">
        <h3
          className="about__h3"
          style={{ color: "white", borderColor: "white" }}
        >
          ¿Como hago mi Pedido?
        </h3>
        <div className="about__tarjeta">
          <Tarjeta
            numero={1}
            title={"Buscar el Producto"}
            desc={"Elige las medias que quieras"}
            extra={
              <p
                className="tarjeta__catalogo"
                onClick={() => navigate("/SrasMedias")}
              >
                Ir al Catalogo
              </p>
            }
          />
          <Tarjeta
            numero={2}
            title={"Agregar al Carrito"}
            desc={
              "Haz click en el boton rojo para agregar el producto al carrito"
            }
          />
          <Tarjeta
            numero={3}
            title={"Confirma el pedido"}
            desc={
              "Arriba a la derecha veras el carrito, despliegalo y confirma el pedido"
            }
          />
          <Tarjeta
            numero={4}
            title={"Envia tu pedido por WhatsApp"}
            desc={
              "Una vez confirmado el pedido, va a aparecer un boton que te va a mandar al WhatsApp, alli ya vas a tener tu pedido listo para enviarlo"
            }
          />
        </div>
      </section>

      <section id="medias" className="home__clientes">
        <h3 className="about__h3">Nuestras Medias</h3>
        <Cliente />
      </section>
    </div>
  );
}

export default HomeView;
