import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Função para enviar e-mail para o convidado (HTML estilizado)
const sendConfirmationEmail = async (to, name) => {
  if (!process.env.RESEND_API_KEY) {
    console.error('Chave de API do Resend não configurada');
    return;
  }

  try {
    await resend.emails.send({
      from: 'contatousbabc@gmail.com',
      to,
      subject: 'Confirmação de Presença - Open House Swiss Park',
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmação de Presença - Open House Swiss Park</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #FFD700, #FFA500);
              padding: 30px;
              text-align: center;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            .content {
              padding: 40px 30px;
              line-height: 1.6;
              color: #333;
            }
            .greeting {
              font-size: 20px;
              color: #2c3e50;
              margin-bottom: 20px;
            }
            .event-details {
              background-color: #f8f9fa;
              border-left: 4px solid #FFD700;
              padding: 20px;
              margin: 20px 0;
            }
            .event-details h3 {
              color: #2c3e50;
              margin-top: 0;
            }
            .footer {
              background-color: #2c3e50;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 14px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .confirmation-badge {
              background-color: #28a745;
              color: white;
              padding: 10px 20px;
              border-radius: 25px;
              display: inline-block;
              margin: 20px 0;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">WELL IMÓVEIS</div>
              <h1>Open House Swiss Park</h1>
            </div>
            
            <div class="content">
              <div class="greeting">Olá, ${name}!</div>
              
              <div class="confirmation-badge">
                ✅ Presença Confirmada com Sucesso!
              </div>
              
              <p>Ficamos muito felizes em confirmar sua presença no nosso evento exclusivo <strong>Open House Swiss Park</strong>.</p>
              
              <div class="event-details">
                <h3>📅 Detalhes do Evento</h3>
                <p><strong>Data:</strong> 6 de novembro de 2024</p>
                <p><strong>Horário:</strong> Das 17h às 21h</p>
                <p><strong>Local:</strong> Swiss Park</p>
                <p><strong>Importante:</strong> Este convite é individual e intransferível</p>
              </div>
              
              <p>Durante o evento, você terá a oportunidade de:</p>
              <ul>
                <li>Conhecer as unidades disponíveis</li>
                <li>Conversar com nossos especialistas</li>
                <li>Esclarecer todas as suas dúvidas</li>
                <li>Aproveitar condições especiais</li>
              </ul>
              
              <p>Agradecemos sua confirmação e esperamos vê-lo(a) em breve!</p>
              
              <p>Atenciosamente,<br>
              <strong>Equipe Well Imóveis</strong></p>
            </div>
            
            <div class="footer">
              <p><strong>WELL IMÓVEIS - NEGÓCIOS IMOBILIÁRIOS</strong></p>
              <p>Em caso de dúvidas, entre em contato conosco.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log('E-mail de confirmação enviado para:', to);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
};

// Função para enviar alerta para o organizador
const sendAlertEmail = async (name, email, company, confirmed) => {
  if (!process.env.RESEND_API_KEY) {
    console.error('Chave de API do Resend não configurada');
    return;
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL,
      subject: '🚨 Nova Confirmação de Presença',
      html: `
        <h2>Novo convidado confirmou presença:</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Confirmado:</strong> ${confirmed ? 'Sim' : 'Não'}</p>
        <p><strong>Data/Hora:</strong> ${new Date().toLocaleString()}</p>
      `,
    });
    console.log('E-mail de alerta enviado para administrador');
  } catch (error) {
    console.error('Erro ao enviar alerta:', error);
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, company, confirmed } = req.body;

  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Nome, e-mail e empresa são obrigatórios' });
  }

  // Validar formato do e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Por favor, insira um e-mail válido' });
  }

  // Enviar e-mails
  await sendConfirmationEmail(email, name);
  await sendAlertEmail(name, email, company, confirmed);

  res.status(200).json({
    message: 'Confirmação registrada com sucesso!',
    name,
    email,
    company,
    confirmed,
  });
}
