import React, { useState, useContext, useEffect, useRef } from "react";
import "./agregarItem.css";
import CarroContext from "../../context/carro/carroContext";
import firebaseApp from "../../firebase/firebase";
import toast, { Toaster } from "react-hot-toast";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

function AgregarItem({ array, id, setArray }) {
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const context = useContext(CarroContext);
  const { setMenuCompleto, setAgregarItem } = useContext(CarroContext);

  const [url, setUrl] = useState(null);
  const [carga, setCarga] = useState(true);
  const [add, setAdd] = useState(false);

  const addItem = async (e) => {
    e.preventDefault(e);
    const title = e.target.inputTitle.value;
    const desc = e.target.inputDesc.value;
    const precio = e.target.inputPrecio.value;
    const urlFoto = e.target.inputFoto.value;
    const stock = e.target.inputStock.value;

    //traemos los datos de base de datos
    const docRef = doc(firestore, `users/${context.user.email}`);
    const consulta = await getDoc(docRef);
    const infoDocu = consulta.data();

    //filtramos la propiedad .items y creamos un array nuevo

    const newArray = infoDocu.items.filter((it) => it.seccion != array.seccion);
    const lugarArray = infoDocu.items.findIndex(
      (a) => a.seccion === array.seccion
    );
    console.log(array.seccion);
    newArray.splice(lugarArray, 0, {
      seccion: array.seccion,
      seccionItems: [
        {
          title: title,
          desc: desc,
          precio: precio,
          id: +new Date(),
          img: urlFoto,
          stock: stock,
        },
        ...array.seccionItems,
      ],
      id: +new Date(),
    });

    //seteamos el estado y updateamos la base de datos
    setArray(newArray);
    updateDoc(docRef, { items: [...newArray] });
    toast.success("Item Agregado");
    popup();
    //limpiar Form
    setUrl(null);
    e.target.inputTitle.value = "";
    e.target.inputDesc.value = "";
    e.target.inputPrecio.value = "";
    e.target.inputFoto.value = "";
    e.target.inputStock.value = "";
    e.target.inputFile.value = null;
  };

  const popup = () => {
    setAdd(!add);
    if (add) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    setCarga(true);
  }, [array]);
  return (
    <div className="add__item__form">
      {add ? (
        <>
          <div className="add__item__container">
            <form action="" className="account__form" onSubmit={addItem}>
              <h2 className="account__form__h2">Agregar Producto</h2>
              <p className="account__form__p">Titulo:</p>
              <input
                type="text"
                placeholder="Titulo"
                className="account__form__input"
                id="inputTitle"
                required
              />
              <p className="account__form__p">Descripcion:</p>
              <input
                type="text"
                placeholder="Descripcion"
                className="account__form__input input__desc"
                id="inputDesc"
              />
              <p className="account__form__p">URL de la Foto:</p>
              <input
                type="text"
                placeholder="Descripcion"
                className="account__form__input"
                id="inputFoto"
                required
              />
              <div className="input__precio">
                <div>
                  <p className="account__form__p">Precio:</p>
                  <input
                    type="number"
                    placeholder="Precio"
                    className="account__form__input"
                    id="inputPrecio"
                    required
                  />
                </div>
                <div>
                  <p className="account__form__p">Stock:</p>
                  <input
                    type="number"
                    placeholder="Stock"
                    className="account__form__input"
                    id="inputStock"
                    required
                  />
                </div>
              </div>

              {carga ? (
                <button type="submit" className="form__agregar">
                  Agregar
                </button>
              ) : (
                <div class="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}

              <div className="add__item__close" onClick={popup}>
                <p>Cerrar</p>
              </div>
              <Toaster position="top-center" className="notificacion" />
            </form>
          </div>
          <div className="add__item__popup">
            <p>Agregar Producto</p>
          </div>
        </>
      ) : (
        <div className="add__item__popup" onClick={popup}>
          <p>Agregar Producto</p>
        </div>
      )}
    </div>
  );
}

export default AgregarItem;
