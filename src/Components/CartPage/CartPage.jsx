import {
  faCircleXmark,
  faStar,
  faStarHalfStroke,
  faClock,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

const CartPage = () => {
  return (
    <div className="">
      <h1 className="mt-32 font-semibold text-4xl CarritodeCompras">
        Carrito de compras <FontAwesomeIcon icon={faCartShopping} />
      </h1>
      <div className="cartContainer flex mt-48 font-mono">
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

        <div className="cartBuy ml-80">
          <div className="cartContainerBuy my-44 p-7 rounded-3xl border mb-20 mt-0 bg-gray-700 text-white">
            <div className="">
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
            </div>

            <div className="">
              <hr class="border-t-2 border-purple-700 my-4" />

              <div className="ml-46 block my-10">
                <h1 className="text-2xl font-bold">Precio total: 2 US$</h1>
              </div>
              <div className="buttonBuy block bottom-7 mx-32">
                <button className="bg-purple-700 rounded-lg">
                  <h1 className="px-8 py-3 text-white font-semibold">Buy $2</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
