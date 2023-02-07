import React, { useState, useContext, useEffect, useRef } from "react";
import CarroContext from "../../../../context/carro/carroContext";
import "./itemSeccion.css";
import firebaseApp from "../../../../firebase/firebase";
import { Link, animateScroll as scroll } from "react-scroll";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import MenuItemAccount from "../../../menu-item-account/menuItemAccount";
import AgregarItem from "../../../agregarItem/agregarItem";
import toast, { Toaster } from "react-hot-toast";

function ItemSeccion({
  item,
  setArray,
  deleteItem,
  editPrecio,
  setPrecioNuevo,
  setUrlNueva,
  setStockNuevo,
  setNombreNuevo,
  stockRapido,
}) {
  const context = useContext(CarroContext);
  const { setMenuCompleto } = useContext(CarroContext);
  const firestore = getFirestore(firebaseApp);
  const [show, setShow] = useState(false);
  const [editarPrecio, setEditarPrecio] = useState(false);

  const cambioPrecio = (e) => {
    setPrecioNuevo(e.target.value);
  };

  const cambioUrl = (e) => {
    setUrlNueva(e.target.value);
  };
  const cambioStock = (e) => {
    setStockNuevo(e.target.value);
  };
  const cambioNombre = (e) => {
    setNombreNuevo(e.target.value);
  };

  return (
    <div className="item__seccion__div">
      <MenuItemAccount
        title={item.title}
        precio={item.precio}
        desc={item.desc}
        img={item.img}
        id={item.id}
        stock={item.stock}
        setStockNuevo={setStockNuevo}
        editPrecio={editPrecio}
      />

      {editarPrecio ? (
        <div className="edit__delete__item">
          <div className="edit__item__container">
            <div className="edit__input__container">
              <form
                className="edit__precio"
                onSubmit={() => {
                  editPrecio(item.id);
                  setEditarPrecio(!editarPrecio);
                }}
              >
                {" "}
                <input
                  type="text"
                  placeholder="Nombre"
                  onChange={cambioNombre}
                />
                <button type="submit" className="guardar__edit">
                  Guardar
                </button>
              </form>

              <form
                className="edit__precio"
                onSubmit={() => {
                  editPrecio(item.id);
                  setEditarPrecio(!editarPrecio);
                }}
              >
                {" "}
                <input
                  type="number"
                  placeholder="Precio"
                  onChange={cambioPrecio}
                />
                <button type="submit" className="guardar__edit">
                  Guardar
                </button>
              </form>
              <form
                className="edit__precio"
                onSubmit={() => {
                  editPrecio(item.id);
                  setEditarPrecio(!editarPrecio);
                }}
              >
                {" "}
                <input
                  type="text"
                  placeholder="Url Imagen"
                  onChange={cambioUrl}
                />
                <button type="submit" className="guardar__edit">
                  Guardar
                </button>
              </form>
              <form
                className="edit__precio"
                onSubmit={() => {
                  editPrecio(item.id);
                  setEditarPrecio(!editarPrecio);
                }}
              >
                {" "}
                <input
                  defaultValue={item.stock}
                  type="number"
                  placeholder="Stock Nuevo"
                  onChange={cambioStock}
                />
                <button type="submit" className="guardar__edit">
                  Guardar
                </button>
              </form>
            </div>

            <button
              className="cancelar__edit"
              onClick={() => setEditarPrecio(!editarPrecio)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="edit__delete__item">
          <button className="delete__item" onClick={() => deleteItem(item.id)}>
            Eliminar Producto
          </button>
          <button
            className="delete__item"
            onClick={() => setEditarPrecio(!editarPrecio)}
          >
            Editar Producto
          </button>
        </div>
      )}
    </div>
  );
}

export default ItemSeccion;
