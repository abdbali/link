import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation(to: string, dateISO: string) {
  if (!process.env.RESEND_API_KEY) return;

  await resend.emails.send({
    from: 'booking@teacherlink.dev',
    to,
    subject: 'Randevu Onayı',
    html: `<p>Randevunuz onaylandı: ${dateISO}</p>`
  });
}
