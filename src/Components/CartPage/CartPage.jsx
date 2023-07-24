import {
  faCircleXmark,
  faStar,
  faStarHalfStroke,
  faClock,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import "./CartPage.css";
import { CartContext } from "../../CartContext";
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
  const { setCartCount } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

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
        console.log(response);
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
      alert("Unfortunately your coupon is not valid");
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
      alert("You have successfully entered your discount coupon!");
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
      setCartCount(updatedCourses.length);

      const updatedTotalPrice = updatedCourses.reduce(
        (total, course) => total + course.prize,
        0
      );
      setTotalPrice(updatedTotalPrice);
    }

    // window.location.reload();
  };

  const shouldCenterOnLG = () => {
    const screenSize = window.innerWidth; // Obtén el ancho de la ventana actual, podrías usar otra lógica si lo prefieres.
    const lgScreenWidth = 1024; // Define aquí el ancho en píxeles para "lg" que desees utilizar.
    return screenSize <= lgScreenWidth;
  };

  // console.log(courses);
  return (
    <div className="flex max-lg:block">
      <div className="w-2/3 cartItems">
        <div className="cartContainer mt-20 font-mono">
          {courses.map((course) => {
            return (
              <div className="cartContainerItem ml-20 mb-20" key={course._id}>
                <div className="mt-2 rounded-2xl flex items-center justify-between bg-[#7c38cd] text-white">
                  <div className="h-full">
                    <img
                      src={course.image}
                      alt=""
                      className="h-full rounded-tl-2xl rounded-bl-2xl w-48 mr-15 border border-[#AA6FFF] courseImage max-lg:border-none"
                    />
                  </div>
                  <div className="flex flex-col py-7 max-lg:-mr-10">
                    <div>
                      <h1 className="font-bold courseTitle">{course.title}</h1>
                      <h2 className="text-sm courseTeacher">
                        {course.teacher}
                      </h2>
                    </div>
                    <div className="flex items-center max-lg:block max-lg:ml-3">
                      <div className="flex items-center mr-3 courseRating">
                        <p className="courseRatingNumber mr-3">
                          {course.rating}
                        </p>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalfStroke} />
                      </div>
                      <div className="flex items-center">
                        <h2 className="mr-2 courseDuration ">
                          {course.duration} hours
                        </h2>
                        <FontAwesomeIcon icon={faClock} />
                      </div>
                    </div>
                  </div>
                  <div className="ml-20 mr-10 max-lg:mr-5 max-lg:ml-10">
                    <h2 className="m-0 text-xl coursePrize">
                      {course.prize} US$
                    </h2>
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
            );
          })}
        </div>
      </div>

      <div className="w-1/3 ml-8 cartBuy center-container">
        <div className="cartContainerBuy p-7 rounded-3xl mb-8 bg-[#7c38cd] text-white">
          <div className="space-y-4">
            <div className="text-3xl font-semibold max-lg:text-xl">
              Shop-car <FontAwesomeIcon icon={faCartShopping} />
            </div>
            <div>
              <div className="text-lg font-semibold max-lg:text-base">
                Total:
              </div>
              <div className="text-2xl max-lg:text-xl">
                ${calculateTotal().toFixed(2)}
              </div>
            </div>

            <div className="w-full h-px bg-gray-300"></div>

            <div>
              <h2 className="text-white text-lg mt-4 max-lg:text-base">
                Apply discount coupon
              </h2>
            </div>
            <div
              className={`flex ${
                shouldCenterOnLG()
                  ? "lg:flex-col lg:items-center divInputCupon"
                  : ""
              } mt-6 lg:px-14`}>
              <input
                placeholder="Discount coupon"
                type="text"
                id="discountCode"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="px-4 py-2 text-white font-semibold max-lg:w-52"
              />
              <button
                className="bg-purple-700 rounded-lg ml-2 hover:bg-[#AA6FFF]"
                onClick={applyDiscount}>
                <h1 className="px-4 py-2 text-white font-semibold">Apply</h1>
              </button>
            </div>
            <div className="buttonBuy mt-6">
              <InternalProvider
                context={{
                  preferenceId,
                  isLoading,
                  orderData,
                  setOrderData,
                }}>
                <main>
                  <button
                    className="bg-purple-700 rounded-lg hover:bg-[#AA6FFF]"
                    onClick={handleClick}>
                    <h1 className="px-4 py-2 text-white font-semibold ">
                      Buy ${calculateTotal(price).toFixed(2)}
                    </h1>
                  </button>
                  <div className="flex justify-center py-2">
                    {renderSpinner()}
                  </div>

                  <Payment />
                </main>
              </InternalProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
