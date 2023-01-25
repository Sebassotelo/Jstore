import React, { useState, useContext, useEffect, useRef } from "react";
import "./navbarNoAuth.css";
import CarroContext from "../../context/carro/carroContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BiMenu } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";

function NavbarNoAuth() {
  const context = useContext(CarroContext);
  const googleProvider = new GoogleAuthProvider();
  const { setUser, setEstadoUsuario } = useContext(CarroContext);

  const [show, setShow] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (show === false) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }

    if (window.innerWidth < 900) {
      setMobile(false);
    } else {
      setMobile(true);
    }
    console.log(window.innerWidth);
  }, [show, window.innerWidth]);

  return (
    <>
      <div className="navbar__noAuth">
        <ul className="nabvar__ul">
          <Link
            className="navbar__item"
            to={"header"}
            spy={true}
            smooth={true}
            duration={500}
          >
            Home
          </Link>
          <Link
            className="navbar__item"
            to={"about"}
            spy={true}
            smooth={true}
            duration={500}
          >
            Como realizar pedido
          </Link>
          <Link
            className="navbar__item"
            to={"medias"}
            spy={true}
            smooth={true}
            duration={500}
          >
            Medias
          </Link>
        </ul>
      </div>

      {show ? (
        <div className="navbar__noAuth__mobile__container">
          <div className="navbar__noAuth__mobile">
            <ul className="nabvar__ul__mobile">
              <Link
                className="navbar__item__mobile"
                to={"header"}
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => setShow(false)}
              >
                Home
              </Link>
              <Link
                className="navbar__item__mobile"
                to={"about"}
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => setShow(false)}
              >
                Hacer mi Pedido
              </Link>
              <Link
                className="navbar__item__mobile"
                to={"medias"}
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => setShow(false)}
              >
                Medias
              </Link>
            </ul>
            <VscClose
              className="navNoAuthClose"
              onClick={() => setShow(false)}
            />
          </div>
        </div>
      ) : (
        <div className="navNoAuth">
          <BiMenu className="noAuth__icon" onClick={() => setShow(true)} />
        </div>
      )}
    </>
  );
}

export default NavbarNoAuth;
