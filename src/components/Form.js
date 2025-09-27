import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Form = ({ onConfirm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !company) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, confirmed }),
      });

      const data = await response.json();

      if (response.ok) {
        onConfirm(data);
      } else {
        setError(data.error || 'Erro ao confirmar presença.');
      }
    } catch (err) {
      setError('Erro de rede. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-black bg-opacity-50 p-6 rounded-lg text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Confirme sua presença</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nome Completo</label>
          <motion.input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            placeholder="Seu nome completo"
            whileFocus={{ scale: 1.02 }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            placeholder="Seu melhor e-mail"
            whileFocus={{ scale: 1.02 }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Empresa</label>
          <motion.input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            placeholder="Nome da sua empresa"
            whileFocus={{ scale: 1.02 }}
          />
        </div>
        <div className="mb-6">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={() => setConfirmed(!confirmed)}
                className="sr-only"
              />
              <div className={`block w-12 h-6 rounded-full ${confirmed ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${confirmed ? 'transform translate-x-6' : ''}`}></div>
            </div>
            <div className="ml-3 text-gray-700">Confirmo minha presença</div>
          </label>
        </div>
        <motion.button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded font-bold text-white ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
          whileHover={!loading ? { scale: 1.03 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
        >
          {loading ? 'Enviando...' : 'CONFIRMAR PRESENÇA'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Form;
