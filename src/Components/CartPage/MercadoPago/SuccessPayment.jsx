import React, { useEffect } from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import emailjs from "emailjs-com";
import { useAuth } from "../../../context/authContext.js";
import "./success.css";

const SuccessRegister = () => {
  const { user } = useAuth();
  const registerEmail = localStorage.getItem("registerEmail");

  console.log(registerEmail);

  useEffect(() => {
    let toEmail = user && user.email ? user.email : registerEmail;

    if (toEmail) {
      const templateParams = {
        to_email: toEmail,
      };

      // emailJS configuration.
      const serviceID = 'service_du1juuc';
      const templateID = 'template_jcklpir';
      const userID = 'fDQoELNyD8T9QkqeR';

      emailjs
        .send(serviceID, templateID, templateParams, userID)
        .then((result) => {
          console.log("Email sent successfully:", result.text);
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
        });
    }
  }, [user, registerEmail]);

  return null;
};

const SuccessPayment = () => {
  const cleanCart = () => {
    localStorage.removeItem("cartCourses");
  };

  return (
    <div className="success">
      <div className="mt-24 my-14">
        <FontAwesomeIcon
          icon={faCheckCircle}
          style={{ color: "#9a47e4" }}
          className="text-9xl"
        />
      </div>
      <div className="my-14">
        <h1>¡Tu compra se ha realizado con éxito!</h1>
      </div>
      <div className="my-14">
        <NavLink to={"/home"}>
          <button
            onClick={cleanCart}
            className="bg-purple-600 flex mx-auto text-white text-center justify-center p-3 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
              style={{ fill: "white" }}
              className="my-auto mx-2"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
            <h1 className="mr-2">Home</h1>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default SuccessPayment;
