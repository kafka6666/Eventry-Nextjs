"use server";

import EmailTemplate from "@/components/payments/EmailTemplate";
import {
  createUser,
  findUserByCredentials,
  getEventById,
  updateGoing,
  updateInterest,
} from "@/models/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

async function registerUser(formData) {
  const userData = Object.fromEntries(formData);
  const createdUser = await createUser(userData);
  redirect("/login");
}

async function performLogin(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const foundUser = await findUserByCredentials(credential);
    return foundUser;
  } catch (error) {
    throw error;
  }
}

async function addInterestedEvent(eventId, userId) {
  try {
    await updateInterest(eventId, userId);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
}

async function addGoingEvent(eventId, user) {
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user?.id);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
  redirect("/");
}

async function sendEmail(eventId, user) {
  try {
    const event = await getEventById(eventId);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const message = `Hello ${user?.name},\n\n
  You have been successfully registered for the event: ${event?.title}.\n\n
  Please carry this email and your official ID to the event venue. \n\n
  We are excited to see you there!`;

    const sentEmail = await resend.emails.send({
      from: "Event Manager <onboarding@resend.dev>",
      to: user?.email,
      subject: "Event Registration Confirmation",
      react: EmailTemplate({ message }),
    });

    return sentEmail;
  } catch (error) {
    throw error;
  }
}

export {
  addGoingEvent,
  addInterestedEvent,
  performLogin,
  registerUser,
  sendEmail,
};
