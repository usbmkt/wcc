import { Resend } from 'resend';

// Função para enviar e-mail para o convidado (HTML estilizado)
const sendConfirmationEmail = async (to, name) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY não configurada - e-mail de confirmação não será enviado');
    return false;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'vileprojetos@gmail.com', // Use este domínio padrão até configurar seu domínio verificado
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
              className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg"

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
              background-color: #000000;
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
    return true;
  } catch (error) {
    console.error('Erro ao enviar e-mail de confirmação:', error);
    return false;
  }
};

// Função para enviar alerta para o organizador
const sendAlertEmail = async (name, email, company, confirmed) => {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
    console.warn('RESEND_API_KEY ou ADMIN_EMAIL não configurados - alerta não será enviado');
    return false;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use este domínio padrão até configurar seu domínio verificado
      to: process.env.ADMIN_EMAIL,
      subject: '🚨 Nova Confirmação de Presença - Open House Swiss Park',
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h2 {
              color: #2c3e50;
              border-bottom: 2px solid #FFD700;
              padding-bottom: 10px;
            }
            .info-row {
              display: flex;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .label {
              font-weight: bold;
              width: 150px;
              color: #666;
            }
            .value {
              flex: 1;
              color: #333;
            }
            .confirmed-yes {
              color: #28a745;
              font-weight: bold;
            }
            .confirmed-no {
              color: #dc3545;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>📋 Nova Confirmação de Presença Recebida</h2>
            
            <div class="info-row">
              <div class="label">Nome:</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="info-row">
              <div class="label">E-mail:</div>
              <div class="value">${email}</div>
            </div>
            
            <div class="info-row">
              <div class="label">Empresa:</div>
              <div class="value">${company}</div>
            </div>
            
            <div class="info-row">
              <div class="label">Status:</div>
              <div class="value ${confirmed ? 'confirmed-yes' : 'confirmed-no'}">
                ${confirmed ? '✅ Presença Confirmada' : '❌ Não Confirmado'}
              </div>
            </div>
            
            <div class="info-row">
              <div class="label">Data/Hora:</div>
              <div class="value">${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</div>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log('E-mail de alerta enviado para administrador');
    return true;
  } catch (error) {
    console.error('Erro ao enviar alerta:', error);
    return false;
  }
};

export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, company, confirmed } = req.body;

  // Validações
  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Nome, e-mail e empresa são obrigatórios' });
  }

  // Validar formato do e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Por favor, insira um e-mail válido' });
  }

  // Sanitizar inputs
  const sanitizedName = name.trim().substring(0, 100);
  const sanitizedEmail = email.trim().toLowerCase().substring(0, 100);
  const sanitizedCompany = company.trim().substring(0, 100);

  // Log da confirmação (sempre funciona, mesmo sem configuração de email)
  console.log('Nova confirmação recebida:', {
    name: sanitizedName,
    email: sanitizedEmail,
    company: sanitizedCompany,
    confirmed: !!confirmed,
    timestamp: new Date().toISOString()
  });

  // Tentar enviar e-mails (não bloqueia se falhar)
  const emailsSent = {
    confirmation: false,
    alert: false
  };

  if (process.env.RESEND_API_KEY) {
    emailsSent.confirmation = await sendConfirmationEmail(sanitizedEmail, sanitizedName);
    emailsSent.alert = await sendAlertEmail(sanitizedName, sanitizedEmail, sanitizedCompany, !!confirmed);
  } else {
    console.warn('⚠️ RESEND_API_KEY não configurada - e-mails não serão enviados');
    console.log('Para habilitar o envio de e-mails:');
    console.log('1. Crie uma conta em https://resend.com');
    console.log('2. Configure as variáveis de ambiente RESEND_API_KEY e ADMIN_EMAIL');
  }

  // Sempre retornar sucesso para o usuário (mesmo que o e-mail falhe)
  res.status(200).json({
    message: 'Confirmação registrada com sucesso!',
    name: sanitizedName,
    email: sanitizedEmail,
    company: sanitizedCompany,
    confirmed: !!confirmed,
    emailStatus: emailsSent
  });
}
