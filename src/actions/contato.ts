'use server'

import nodemailer from 'nodemailer'

type FormState = {
  success: boolean
  error?: string
}

export async function enviarContato(prevState: FormState | null, formData: FormData): Promise<FormState> {
  const nome = formData.get('nome')?.toString() ?? ''
  const email = formData.get('email')?.toString() ?? ''
  const mensagem = formData.get('mensagem')?.toString() ?? ''

  if (!nome || !email || !mensagem) {
    return { success: false, error: 'Todos os campos são obrigatórios.' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Email inválido.' }
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('EMAIL_USER ou EMAIL_PASS não configurados.')
    return { success: false, error: 'Servidor não configurado para envio de emails. Configure as variáveis de ambiente.' }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Contato do site — ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #059669;">Novo contato pelo site</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p style="white-space: pre-wrap;">${mensagem}</p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return { success: false, error: 'Erro ao enviar mensagem. Tente novamente mais tarde.' }
  }
}
