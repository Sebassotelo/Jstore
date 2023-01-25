import React, { useState, useContext, useEffect, useRef } from "react";
import "./loginView.css";
import CarroContext from "../../context/carro/carroContext";
import toast, { Toaster } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { BsFillCheckCircleFill, BsArrowReturnLeft } from "react-icons/bs";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import firebaseApp from "../../firebase/firebase";

import Navbar from "../../componentes/navbar/navbar";
import NavbarMobile from "../../componentes/navbarMobile/navbarMobile";
import Loader from "../../componentes/loader/Loader";

function ConfirmacionView() {
  const googleProvider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const context = useContext(CarroContext);
  const {
    setUser,
    setMenuCompleto,
    setUsuario,
    setInfoPublica,
    setEstadoUsuario,
  } = useContext(CarroContext);

  const [array, setArray] = useState(null);
  const [containerSeccion, setContainerSeccion] = useState("");
  const [loader, setLoader] = useState(true);
  const [vence, setVence] = useState("");
  const [newPremium, setNewPremium] = useState(false);

  const firestore = getFirestore(firebaseApp);

  //USE EFFECT
  useEffect(() => {
    onAuthStateChanged(context.auth, inspectorSesion);
    fetchTareas();
  }, [context.user]);

  const fetchTareas = async () => {
    const tareasFetchadas = await buscarOCrearUsuario(context.user.email);
    setMenuCompleto(tareasFetchadas.items);
    setArray(tareasFetchadas.items);
  };

  const inspectorSesion = (usuarioFirebase) => {
    //en caso de que haya seison iniciada
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
      setEstadoUsuario(1);
      document.title = `Menus | ${context.user.displayName}`;
    } else {
      //en caso de que haya seison iniciada

      setUser(null);
    }
  };

  const fake = [];

  const configGenerico = {
    usuarioInstagram: "",
    urlInstagram: "",
    whatsapp: "",
    direccion: "",
    ciudad: "",
    pais: "",
  };
  const buscarOCrearUsuario = async (e) => {
    const docRef = doc(firestore, `users/${e}`);
    const consulta = await getDoc(docRef);
    console.log(consulta);
    if (consulta.exists()) {
      const infoDocu = consulta.data();
      setUsuario(infoDocu.username);
      setEstadoUsuario(2);
      setLoader(true);
      setInfoPublica(infoDocu);
      if (infoDocu.username === "generico") {
        setUsuario(null);
        setEstadoUsuario(1);
      }
      if (context.infoPublica.instagram !== "") {
        setEstadoUsuario(3);
      }

      if (context.infoPublica.premium) {
        setEstadoUsuario(4);
      }
      console.log("estado usuario", context.estadoUsuario);
      return infoDocu;
    } else {
      // const fecha = new Date();
      // await setDoc(docRef, {
      //   items: [...fake],
      //   username: "generico",
      //   perfil: configGenerico,
      //   urlFoto: "generico",
      //   premium: true,
      //   style: {},
      //   styleNoPremium: {},
      //   fechaDeCreacion: `${fecha.getDate()}/${
      //     fecha.getMonth() + 1
      //   }/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes() + 1}`,
      // });
      // setUsuario(null);
      // setEstadoUsuario(1);
      // setLoader(true);
      // const consulta = await getDoc(docRef);
      // const infoDocu = consulta.data();
      // setInfoPublica(infoDocu);
      // return infoDocu;
    }
  };

  if (loader) {
    return (
      <div className="account">
        {context.user ? <Navbar /> : ""}
        {context.user ? <NavbarMobile /> : ""}
        <div className="confirmacion__premium">
          <div
            className="confirmacion__premium__container"
            onClick={() => signInWithPopup(context.auth, googleProvider)}
          >
            <p>Ingresar con Google</p>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default ConfirmacionView;
