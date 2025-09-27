import nodemailer from 'nodemailer';

// Configurar Nodemailer (exemplo com Gmail — use variáveis de ambiente!)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Função para enviar e-mail para o convidado
const sendConfirmationEmail = async (to, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Confirmação de Presença - Open House Swiss Park',
    html: `
      <h2>Olá, ${name}!</h2>
      <p>Sua presença foi confirmada para o Open House Swiss Park.</p>
      <p>Data: 6 de novembro, das 17h às 21h.</p>
      <p>Este convite é individual e intransferível.</p>
      <p>Obrigado por participar!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail de confirmação enviado para:', to);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
};

// Função para enviar alerta para o organizador
const sendAlertEmail = async (name, company, confirmed) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: '🚨 Nova Confirmação de Presença',
    html: `
      <h2>Novo convidado confirmou presença:</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Empresa:</strong> ${company}</p>
      <p><strong>Confirmado:</strong> ${confirmed ? 'Sim' : 'Não'}</p>
      <p><strong>Data/Hora:</strong> ${new Date().toLocaleString()}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail de alerta enviado para administrador');
  } catch (error) {
    console.error('Erro ao enviar alerta:', error);
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, company, confirmed } = req.body;

  if (!name || !company) {
    return res.status(400).json({ error: 'Nome e empresa são obrigatórios' });
  }

  // Enviar e-mails
  await sendConfirmationEmail('convidado@example.com', name); // Substitua pelo e-mail real do convidado
  await sendAlertEmail(name, company, confirmed);

  res.status(200).json({
    message: 'Confirmação registrada com sucesso!',
    name,
    company,
    confirmed,
  });
}

