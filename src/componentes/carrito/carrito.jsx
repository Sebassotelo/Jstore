import React, { useContext, useEffect, useState } from "react";
import CarroContext from "../../context/carro/carroContext";
import "./carrito.css";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

function Carrito() {
  const context = useContext(CarroContext);

  const [cuenta, setCuenta] = useState(context.carrito);
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [unidades, setUnidades] = useState(0);
  const [realizarPedido, setRealizarPedido] = useState(true);
  const [confirmacion, setConfirmacion] = useState(false);
  const [ped, setPed] = useState("");

  const { setCarrito, actuCarrito } = useContext(CarroContext);

  let totalPrecio = 0;
  let totalUnidades = 0;

  useEffect(() => {
    context.carrito.map((e, i) => {
      totalPrecio = totalPrecio + e.precio * e.cant;
      totalUnidades = totalUnidades + e.cant;
    });
    if (totalUnidades >= 4) {
      totalPrecio = totalPrecio - totalUnidades * 60;
    }

    setTotal(totalPrecio);
    setUnidades(totalUnidades);
    setCuenta(context.carrito);
    setConfirmacion(false);
    setRealizarPedido(true);

    console.log("unidades", totalUnidades);

    if (totalUnidades === 0) {
      setConfirmacion(false);
    }
  }, [context.actualizacion]);

  const reset = () => {
    setTotal(0);
    setCarrito([]);
    setCuenta([]);
    setUnidades(0);
    setConfirmacion(false);
    mostrarCarrito();
  };

  const eliminar = (id) => {
    setCarrito(context.carrito.filter((e, i) => e.id !== id));
    actuCarrito();
  };

  const mostrarCarrito = () => {
    setShow(!show);

    if (show === true) {
      document.body.style.overflow = "";
    } else {
      if (window.innerWidth < 900) {
        document.body.style.overflow = "hidden";
      }
    }
  };

  let pedidoCopy = "";
  const copiarAlPortapapeles = () => {
    setRealizarPedido(false);
  };

  // const confirmarPedido = () => {
  //   if (unidades > 0) {
  //     pedidoCopy = "";
  //     context.carrito.map(
  //       (e) =>
  //         (pedidoCopy =
  //           pedidoCopy +
  //           `${e.cant}X ${e.titulo} ----- $${e.precio * e.cant}  \n`)
  //     );
  //     pedidoCopy = `Hola, te pido esto:\n\n${pedidoCopy} \nTotal: $${total}`;

  //     navigator.clipboard.writeText(pedidoCopy);

  //     toast.success("Pedido copiado al portapapeles");
  //     console.log(pedidoCopy);

  //     if (unidades > 0) {
  //       setConfirmacion(true);
  //     }

  //     setRealizarPedido(true);
  //   } else {
  //     setRealizarPedido(true);
  //     toast.error("Agrege items al carrito");
  //   }
  // };
  const confirmarPedido = () => {
    if (unidades > 0) {
      pedidoCopy = "";
      context.carrito.map(
        (e) =>
          (pedidoCopy =
            pedidoCopy +
            `${e.cant}X%20${e.titulo}%20-----%20$${
              unidades >= 4
                ? e.precio * e.cant - e.cant * 60
                : e.precio * e.cant
            }%20%0A`)
      );
      let descuentoTotal;
      let precioTotal;
      if (unidades >= 4) {
        descuentoTotal = `Descuento%20aplicado%20de:%20$${unidades * 60}`;
        precioTotal = `Total%20con%20descuento:%20$${total}`;
      } else {
        descuentoTotal = "";
        precioTotal = `Total:%20$${total}`;
      }
      setPed(
        `Hola,%20te%20pido%20esto:%0A%0A${pedidoCopy}%0A${precioTotal}%0A${descuentoTotal}`
      );

      navigator.clipboard.writeText(pedidoCopy);

      toast.success("Pedido copiado al portapapeles");
      console.log(ped);

      if (unidades > 0) {
        setConfirmacion(true);
      }

      setRealizarPedido(true);
    } else {
      setRealizarPedido(true);
      toast.error("Agrege items al carrito");
    }
  };

  return (
    <div className="carr">
      {show ? (
        <div className="carro__contenedor">
          {" "}
          <div
            className={show ? "carrito hidden" : "carrito"}
            style={context.style.carrito}
          >
            <div className="close" onClick={mostrarCarrito}>
              <p className="close__p">Seguir Pidiendo</p>
            </div>
            <div
              className="carrito__title"
              style={{
                color: `${context.letraCarrito}`,
                borderBottom: `1px solid ${context.letraCarrito}`,
              }}
            >
              <h3>Carrito</h3>
            </div>

            <div className="carrito__container" id="cuenta">
              {cuenta
                .filter((e) => e.cant != 0)
                .map((e, i) => (
                  <div className="carrito__item">
                    <p
                      className="carrito__name"
                      style={{ color: `${context.letraCarrito}` }}
                    >
                      {e.cant}x {e.titulo}
                    </p>
                    <p
                      className="carrito__precio"
                      style={{ color: `${context.letraCarrito}` }}
                    >
                      $
                      {unidades >= 4
                        ? e.precio * e.cant - e.cant * 60
                        : e.precio * e.cant}
                    </p>
                    <AiOutlineClose
                      className="carrito__eliminar"
                      onClick={() => eliminar(e.id)}
                      style={{ color: `${context.letraCarrito}` }}
                    />
                  </div>
                ))}
            </div>

            <div className="total__container">
              <button onClick={reset} className="total__reset">
                BORRAR
              </button>
              <div
                className="total"
                style={{ borderTop: `1px solid ${context.letraCarrito}` }}
              >
                <h4 style={{ color: `${context.letraCarrito}` }}>
                  TOTAL: ${total}
                </h4>
                {unidades >= 4 && (
                  <p className="total__descuento">
                    Descuento Aplicado de ${unidades * 60}
                  </p>
                )}
              </div>

              {realizarPedido ? (
                <button
                  className={
                    confirmacion ? "button__hidden " : "realizar__pedido"
                  }
                  onClick={copiarAlPortapapeles}
                >
                  Realizar Pedido
                </button>
              ) : (
                <button
                  className="realizar__pedido confirmar"
                  onClick={confirmarPedido}
                >
                  {" "}
                  Confirmar{" "}
                </button>
              )}

              {confirmacion ? (
                <div className="realizar__pedido wpp">
                  <a
                    href={`https://api.whatsapp.com/send?phone=54${context.infoPublica.perfil.whatsapp}&text=${ped}`}
                    target={"_blank"}
                  >
                    Ir a Whatsapp
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={mostrarCarrito}
          className="show__carrito"
          id="showCarrito"
        >
          <AiOutlineShoppingCart className="show__icon" />
          {unidades > 0 ? (
            <div className="show__unidades">
              <p>{unidades}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      <Toaster position="top-center" className="notificacion" />
    </div>
  );
}

export default Carrito;
