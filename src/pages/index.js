import React, { useState } from 'react';
import Form from '../components/Form';
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logoWell from '../assets/logo-well.png';
import swissImage from '../assets/swiss.png';

const HomePage = () => {
  const [confirmed, setConfirmed] = useState(null);

  const handleConfirm = (data) => {
    setConfirmed(data);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="overlay"></div>
      <div className="container w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-6 p-4">

        {/* LOGO E REDES SOCIAIS */}
        <motion.div
          className="w-full md:w-1/4 flex flex-col items-start space-y-4"
          variants={itemVariants}
        >
          <img 
            src={logoWell} 
            alt="Well Logo" 
            className="h-12 w-auto object-contain"
          />
          <p className="text-sm text-white font-medium">NEGÓCIOS IMOBILIÁRIOS</p>
          <div className="mt-10 flex space-x-10">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white text-xl hover:text-yellow-500 transition cursor-pointer" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-white text-xl hover:text-yellow-500 transition cursor-pointer" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-white text-xl hover:text-yellow-500 transition cursor-pointer" />
            </a>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-white text-xl hover:text-yellow-500 transition cursor-pointer" />
            </a>
          </div>
        </motion.div>

        {/* FORMULÁRIO OU MENSAGEM DE SUCESSO */}
        <motion.div
          className="w-full md:w-2/4 flex flex-col items-center justify-center"
          variants={itemVariants}
        >
          {confirmed ? (
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Confirmação Recebida!</h2>
              <p className="text-gray-700 mb-4">
                Olá, <strong>{confirmed.name}</strong>! Sua presença foi confirmada.
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Um e-mail de confirmação foi enviado para:
              </p>
              <p className="text-sm font-medium text-blue-600 mb-4">
                {confirmed.email}
              </p>
              <button
                onClick={() => setConfirmed(null)}
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Fazer Nova Confirmação
              </button>
            </motion.div>
          ) : (
            <Form onConfirm={handleConfirm} />
          )}
        </motion.div>

        {/* EVENTO INFO */}
        <motion.div
          className="w-full md:w-1/4 flex flex-col gap-6"
          variants={itemVariants}
        >
          <motion.div
            className="bg-black bg-opacity-50 p-6 rounded-lg text-white"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-script mb-4">Open House</h1>
            <div className="bg-white bg-opacity-20 p-4 rounded mb-4">
              <div className="h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded flex items-center justify-center relative overflow-hidden">
                <img 
                  src={swissImage} 
                  alt="Swiss Park" 
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 className="text-2xl font-bold text-white"> </h2>
                </div>
              </div>
            </div>
            <div className="border-t border-white pt-4">
              <p className="text-xl font-bold">6 de novembro das 17 às 21h</p>
              <p className="mt-2 text-sm">
                O evento será relaizado no Condomínio Swiss Park na  Avenida Omar Daibert, nº 1, no bairro Parque Terra Nova II
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default HomePage;
