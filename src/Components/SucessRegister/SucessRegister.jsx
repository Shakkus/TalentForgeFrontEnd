import React from 'react';
import { Link } from 'react-router-dom';
import background from '../../Recourses/sucefull-background.png';

const SucessRegister = () => {
  return (
    <div className="min-h-screen bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center" style={{ backgroundImage: `url(${background})`, marginTop: '80px' }}>
       <h1 className="text-3xl font-bold text-purple-800 mb-4">¡Registro Exitoso!</h1>
      <p className="text-purple-800 text-lg mb-8">Gracias por registrarte. Disfruta de nuestra plataforma.</p>
      <Link to="/home">
      <button className="courseBtn bg-[#7c38cd] hover:bg-[#AA6FFF] text-white font-bold py-2 px-4 rounded" style={{marginBottom: '150px' }}>Ir a la página de inicio</button>
      </Link>
    </div>
  );
};

export default SucessRegister;
