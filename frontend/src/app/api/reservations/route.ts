import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ReservationRequest = {
  customerName?: string;
  email?: string;
  studioName?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  hours?: number;
  hourlyRate?: number;
  total?: number;
};

const money = (value: number) => new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
}).format(value);

export async function POST(request: Request) {
  try {
    const reservation = (await request.json()) as ReservationRequest;
    const email = reservation.email?.trim();

    if (!email || !reservation.studioName || !reservation.date || !reservation.startTime || !reservation.endTime) {
      return NextResponse.json({ error: 'Complete reservation details and a Gmail address are required.' }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    if (!gmailUser || !gmailAppPassword) {
      return NextResponse.json({
        ok: true,
        emailSent: false,
        message: `Reservation received for ${email}. Gmail confirmation is pending setup.`,
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailAppPassword },
    });

    const total = Number(reservation.total) || 0;
    await transporter.sendMail({
      from: `SONORA Reservations <${gmailUser}>`,
      to: email,
      bcc: process.env.RESERVATION_OWNER_EMAIL || gmailUser,
      subject: `SONORA studio reservation - ${reservation.date}`,
      text: [
        `Hi ${reservation.customerName || 'SONORA customer'},`,
        '',
        'Your SONORA studio reservation request has been received.',
        `Studio: ${reservation.studioName}`,
        `Date: ${reservation.date}`,
        `Time: ${reservation.startTime} - ${reservation.endTime}`,
        `Duration: ${reservation.hours || 0} hour(s)`,
        `Hourly rate: ${money(Number(reservation.hourlyRate) || 0)}`,
        `Total payment: ${money(total)}`,
        '',
        'Please wait for SONORA to confirm the reservation before arriving.',
        'Thank you for choosing SONORA.',
      ].join('\n'),
    });

    return NextResponse.json({ ok: true, message: `Reservation details were sent to ${email}.` });
  } catch (error) {
    console.error('Reservation email failed:', error);
    return NextResponse.json({
      ok: true,
      emailSent: false,
      message: 'Reservation received, but Gmail confirmation is pending. Please keep this reservation reference and wait for SONORA confirmation.',
    });
  }
}
