import React, { useState } from 'react';
import Form from '../components/Form';
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import QRCode from 'qrcode.react';
import { motion } from 'framer-motion';

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
          <img src="/logo-well.png" alt="Well Imóveis" className="h-16 md:h-20" />
          <p className="text-sm text-white font-medium">NEGÓCIOS IMOBILIÁRIOS</p>
          <div className="mt-6 flex space-x-4">
            <FaInstagram className="text-white text-xl cursor-pointer" />
            <FaFacebook className="text-white text-xl cursor-pointer" />
            <FaTwitter className="text-white text-xl cursor-pointer" />
            <FaWhatsapp className="text-white text-xl cursor-pointer" />
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
              <p className="text-sm text-gray-500">
                Um e-mail de confirmação foi enviado para seu endereço.
              </p>
            </motion.div>
          ) : (
            <Form onConfirm={handleConfirm} />
          )}

          {/* QR Code para mobile */}
          <motion.div
            className="mt-6 md:hidden bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-center text-gray-700 mb-2">Escaneie o QR Code para acessar novamente:</p>
            <div className="flex justify-center">
              <QRCode value={window.location.href} size={128} />
            </div>
          </motion.div>
        </motion.div>

        {/* EVENTO INFO E QR CODE PARA DESKTOP */}
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
              <img src="https://i.imgur.com/5QZ3h2K.jpg" alt="Swiss Park" className="w-full h-32 object-cover rounded" />
              <h2 className="text-xl font-bold mt-2">Swiss Park</h2>
            </div>
            <div className="border-t border-white pt-4">
              <p className="text-xl font-bold">6 de novembro das 17 às 21h</p>
              <p className="mt-2 text-sm">
                ESTE CONVITE É INDIVIDUAL E INTRANSFERÍVEL. CONFIRME SUA PRESENÇA.
              </p>
            </div>
          </motion.div>

          {/* QR Code para desktop */}
          <motion.div
            className="hidden md:block bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-center text-gray-700 mb-2">Escaneie o QR Code para acessar este formulário:</p>
            <div className="flex justify-center">
              <QRCode value={window.location.href} size={128} />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default HomePage;

