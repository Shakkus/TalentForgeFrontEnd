import {
  faCircleXmark,
  faStar,
  faStarHalfStroke,
  faClock,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import "./CartPage.css";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import InternalProvider, { Context } from "./MercadoPago/ContextProvider";
import { Payment } from "./MercadoPago/Payment";
import React from "react";
initMercadoPago("TEST-3fb05707-886c-4f67-810e-e2d501054a5b");

// import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [originalPrice, setOriginalPrice] = useState(1);
  const [price, setPrice] = useState(1);
  const [discountCode, setDiscountCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [orderData, setOrderData] = useState({
    quantity: "1",
    amount: 10,
    price: originalPrice,
    description: "Courses",
  });
  const [isVisible, setIsVisible] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (preferenceId) setIsVisible(false);
  }, [preferenceId]);

  const handleClick = async () => {
    setIsLoading(true);
    await fetch("https://talent-forge-data.cyclic.app/cart/create_preference", {
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
    if (discountCode === "") {
      setPrice(originalPrice);
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        price: originalPrice,
      }));
      return;
    }

    const discount = obtainDiscount(discountCode);
    if (discount === null) {
      alert("Lamentablemente tu cupón no es válido");
      return;
    }

    const discountedPrice = originalPrice * (1 - discount);
    setPrice(discountedPrice);
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      price: discountedPrice,
    }));
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

  useEffect(() => {
    const coursesInCart = localStorage.getItem("cartCourses");
    if (coursesInCart) {
      const parsedCourses = JSON.parse(coursesInCart);
      setCourses(parsedCourses);
      const totalPrice = parsedCourses.reduce(
        (total, course) => total + course.prize,
        0
      );
      setOriginalPrice(totalPrice);
      setPrice(totalPrice);
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        price: totalPrice,
      }));
    }
  }, []);

  // const cartCourses = () => {
  //   const coursesInCart = localStorage.getItem("cartCourses");
  //   if (coursesInCart) {
  //     const parsedCourses = JSON.parse(coursesInCart);
  //     setCourses(parsedCourses);
  //   }
  // };

  const calculateTotal = () => {
    const totalPrice = courses.reduce(
      (total, course) => total + course.prize,
      0
    );
    return Math.max(totalPrice);
  };

  const removeCourse = (courseId) => {
    const existingCourses = localStorage.getItem("cartCourses");

    if (existingCourses) {
      const cartCourses = JSON.parse(existingCourses);

      const updatedCourses = cartCourses.filter(
        (course) => course._id !== courseId
      );

      localStorage.setItem("cartCourses", JSON.stringify(updatedCourses));
      setCourses(updatedCourses);
    }

    window.location.reload();
  };
  console.log(courses);
  return (
    <div>
      <h1 className="mt-20 font-semibold text-4xl CarritodeCompras">
        Carrito de compras <FontAwesomeIcon icon={faCartShopping} />
      </h1>
      <div className="flex">
        <div className="cartContainer mt-20 font-mono">
          {courses.map((course) => {
            return (
              <div className="cartContainerItem ml-20 mb-20" key={course._id}>
                <div className="mt-2 rounded-2xl flex items-center justify-between bg-gray-600 text-white ml-32">
                  <img
                    src={course.image}
                    alt=""
                    className=" mr-4 rounded-tl-2xl rounded-bl-2xl w-48 mr-15 courseImage"
                  />
                  <div className="flex py-7">
                    <div className="text-start">
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
                    <div className="ml-20 mr-10">
                      <h2 className="m-0 text-xl">{course.prize} US$</h2>
                      <button
                        className="inline p-4"
                        onClick={() => removeCourse(course._id)}>
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          style={{ color: "", fontSize: "28px" }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cartBuy ml-96">
          <div className="cartContainerBuy p-7 rounded-3xl mb-20 bg-gray-600 text-white">
            <div className="">
              <div className="space-x-20 text-end text-2xl">
                <h1 onChange={(e) => setOriginalPrice(e.target.value)}>
                  Precio: ${calculateTotal()}
                </h1>
              </div>
              <hr class="border-t-2 border-purple-700 my-4" />
              <div className="ml-46 block my-10">
                <h1 className="text-2xl font-bold">
                  Precio total: ${Math.max(price)}
                </h1>
              </div>
              <div className="buttonBuy block bottom-7 mx-32">
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
                      onClick={handleClick}>
                      <h1 className="px-8 py-3 text-white font-semibold">
                        Buy ${Math.max(price)}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
