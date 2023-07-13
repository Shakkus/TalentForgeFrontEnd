import {
  faCircleXmark,
  faStar,
  faStarHalfStroke,
  faClock,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import React, { useContext, useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import InternalProvider, { Context } from "./MercadoPago/ContextProvider";
import { Payment } from "./MercadoPago/Payment";
import { useNavigate } from "react-router";
initMercadoPago("TEST-3fb05707-886c-4f67-810e-e2d501054a5b");

// import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [originalPrice, setOriginalPrice] = useState(20);
  const [price, setPrice] = useState(20);
  const [discountCode, setDiscountCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [orderData, setOrderData] = useState({
    quantity: "1",
    amount: 10,
    price: price,
    description: "courses",
  });
  const [isVisible, setIsVisible] = useState(true);
  const { isLoading: disabled } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (preferenceId) setIsVisible(false);
  }, [preferenceId, navigate]);

  const handleClick = async () => {
    setIsLoading(true);
    await fetch("http://localhost:3001/cart/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        return response.json();
      })
      .then((preference) => {
        setPreferenceId(preference.id);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderSpinner = () => {
    if (isLoading) {
      return (
        <div>
          <SpinnerCircular color="#7e22ce" />
        </div>
      );
    }
  };

  const applyDiscount = () => {
    const discount = obtainDiscount(discountCode);
    if (discount === null) {
      alert("Lamentablemente tu cupón no es válido");
      return;
    }
    const discountedPrice = originalPrice * (1 - discount);
    setPrice(discountedPrice);
  };

  const obtainDiscount = (discountCode) => {
    const codes = {
      ss62Zq6QnNkATBfuk9: 0.2,
      "1C72y4bCdxC8EDQtUZ": 0.15,
      K095IVlE4AkuZ9JXPp: 0.3,
      tiago: 1,
      gordobarril: -41238,
    };
    if (codes.hasOwnProperty(discountCode)) {
      alert("¡Ingresaste tu cupón de descuento con éxito!");
      return codes[discountCode];
    }
    return null;
  };

  return (
    <div className="">
      <h1 className="mt-32 font-semibold text-4xl CarritodeCompras">
        Carrito de compras <FontAwesomeIcon icon={faCartShopping} />
      </h1>
      <div className="cartContainer flex mt-20 font-mono">
        <div className="cartContainerItem w-2/4 ml-20 mb-20">
          <div className="mt-2 border border-gray-300 rounded-2xl flex items-center justify-center my-12 space-x-7 space-x-44 bg-gray-600 text-white">
            <img
              src="logo512.png"
              alt=""
              className="mr-4 rounded-tl-3xl rounded-br-3xl w-40"
            />
            <div>
              <h1 className="font-bold">Nombre del curso</h1>
              <h2 className="text-sm">Por X Profesor</h2>
              <div className="flex text-center items-center">
                <p className="mr-3">4.6</p>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStarHalfStroke} />
              </div>
              <div className="flex text-center items-center">
                <h2 className="mr-2 text-center items-center flex">72 horas</h2>
                <FontAwesomeIcon icon={faClock} />
              </div>
            </div>
            <h2 className="m-0 text-xs">74.99 US$</h2>
            <button className="inline p-4 ml-12">
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ color: "", fontSize: "28px" }}
              />
            </button>
          </div>
        </div>
        {/* <div className="cartContainerItem w-2/4 ml-20 mb-20">
          {courses.map((course) => (
            <div
              key={course._id}
              className="mt-2 border border-gray-300 rounded-2xl flex items-center justify-center my-12 space-x-7 space-x-44 bg-gray-600 text-white">
              <img
                src={course.image}
                alt=""
                className="mr-4 rounded-tl-3xl rounded-br-3xl w-40"
              />
              <div>
                <h1 className="font-bold">{course.title}</h1>
                <h2 className="text-sm">{course.teacher}</h2>
                <div className="flex text-center items-center">
                  <p className="mr-3">{course.rating}</p>
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarHalfStroke} />
                </div>
                <div className="flex text-center items-center">
                  <h2 className="mr-2 text-center items-center flex">
                    {course.duration}
                  </h2>
                  <FontAwesomeIcon icon={faClock} />
                </div>
              </div>
              <h2 className="m-0 text-xs">{course.prize} US$</h2>
              <button className="inline p-4 ml-12">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  style={{ color: "", fontSize: "28px" }}
                />
              </button>
            </div>
          ))}
        </div> */}

        <div className="cartBuy ml-80">
          <div className="cartContainerBuy my-44 p-7 rounded-3xl border mb-20 mt-0 bg-gray-700 text-white">
            {/* <div className="">
              <div className="flex">
                <div>
                  <h1>Nombre del curso</h1>
                  <h2>Por X Profesor</h2>
                </div>
                <div className="ml-auto">
                  <h2 className="ml-32">$Precio USD</h2>
                </div>
              </div>
            </div>
            <div className="my-9">
              <div className="flex">
                <div>
                  <h1>Nombre del curso</h1>
                  <h2>Por X Profesor</h2>
                </div>
                <div className="ml-auto">
                  <h2 className="">$Precio USD</h2>
                </div>
              </div>
            </div>
            <div className="space-x-7 my-9">
              <div className="flex">
                <div>
                  <h1>Nombre del curso</h1>
                  <h2>Por X Profesor</h2>
                </div>
                <div className="ml-auto">
                  <h2 className="">$Precio USD</h2>
                </div>
              </div>
            </div> */}

            <div className="">
              {/* <hr class="border-t-2 border-purple-700 my-4" /> */}
              <div className="space-x-20 text-end text-2xl">
                {/* <label htmlFor="Price" className="">
                  Precio $
                </label> */}
                <h1 onChange={(e) => setOriginalPrice(e.target.value)}>
                  Precio: ${originalPrice}
                </h1>
                {/* <h1 onChange={(e) => setOriginalPrice(e.target.value)}>
                  {originalPrice}
                </h1> */}
                {/* <input
                  type="number"
                  id="price"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="text-black text-center bg-gray-700 text-white font-bold text-2xl disabledInput"
                  disabled
                /> */}
              </div>
              <div className="ml-46 block my-10">
                <h1 className="text-2xl font-bold">
                  Precio final: {price} US$
                </h1>
              </div>
              <div className="buttonBuy block bottom-7 mx-32">
                {/* <button className="bg-purple-700 rounded-lg">
                  <h1 className="px-8 py-3 text-white font-semibold">
                    Buy ${price} USD
                  </h1>
                </button> */}
                <InternalProvider
                  context={{
                    preferenceId,
                    isLoading,
                    orderData,
                    setOrderData,
                  }}>
                  <main>
                    {renderSpinner()}
                    <button
                      className="bg-purple-700 rounded-lg"
                      onClick={handleClick}
                      disabled={disabled}>
                      <h1 className="px-8 py-3 text-white font-semibold">
                        Buy ${price}
                      </h1>
                    </button>
                    <Payment />
                  </main>
                </InternalProvider>
              </div>
              <div className="flex text-center align-middle mt-10">
                <label htmlFor="discountCode" className="text-sm mr-4">
                  Ingresar cupón de descuento
                </label>
                <input
                  type="text"
                  id="discountCode"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="text-black text-center"
                />
              </div>
              <button
                className="bg-purple-700 rounded-lg mt-8"
                onClick={applyDiscount}>
                <h1 className="px-8 py-3 font-semibold">Aplicar</h1>
              </button>
              {/* <h2>Price {Math.floor(price)}</h2>
              {console.log(price)} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
