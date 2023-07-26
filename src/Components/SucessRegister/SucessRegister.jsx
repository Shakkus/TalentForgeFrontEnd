import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import background from '../../Recourses/sucefull-background.png';
import { useAuth } from "../../context/authContext.js";

const SucessRegister = () => {
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
      const templateID = 'template_bp04mdd';
      const userID = 'fDQoELNyD8T9QkqeR';

      // Send the email
      emailjs.send(serviceID, templateID, templateParams, userID)
        .then((result) => {
          console.log('Email sent successfully:', result.text);
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
        });
    }
  }, [user, registerEmail]);

  return (
    <div className="min-h-screen bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center" style={{ backgroundImage: `url(${background})`, marginTop: '80px' }}>
      <h1 className="text-3xl font-bold text-purple-800 mb-4">¡Registro Exitoso!</h1>
      <p className="text-purple-800 text-lg mb-8">Gracias por registrarte. Disfruta de nuestra plataforma.</p>
      <Link to="/home">
        <button className="courseBtn bg-[#7c38cd] hover:bg-[#AA6FFF] text-white font-bold py-2 px-4 rounded" style={{ marginBottom: '150px' }}>Ir a la página de inicio</button>
      </Link>
    </div>
  );
};

export default SucessRegister;
