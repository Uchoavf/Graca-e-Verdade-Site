'use server'

import nodemailer from 'nodemailer'
import { checkEmailRateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

type FormState = {
  success: boolean
  error?: string
}

export async function enviarContato(prevState: FormState | null, formData: FormData): Promise<FormState> {
  const honeypot = formData.get('website')?.toString() ?? ''
  if (honeypot) {
    return { success: true }
  }

  const nome = formData.get('nome')?.toString().trim() ?? ''
  const email = formData.get('email')?.toString().trim() ?? ''
  const mensagem = formData.get('mensagem')?.toString().trim() ?? ''

  if (!nome || !email || !mensagem) {
    return { success: false, error: 'Todos os campos são obrigatórios.' }
  }

  if (nome.length > 100 || email.length > 320 || mensagem.length > 5000) {
    return { success: false, error: 'Dados excedem o tamanho máximo permitido.' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Email inválido.' }
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('EMAIL_USER ou EMAIL_PASS não configurados.')
    return { success: false, error: 'Servidor não configurado para envio de emails. Configure as variáveis de ambiente.' }
  }

  const headersList = await headers()
  const forwarded = headersList.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() ?? 'unknown'
  const rateCheck = checkEmailRateLimit(`contato:${ip}`)

  if (!rateCheck.allowed) {
    return { success: false, error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' }
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
