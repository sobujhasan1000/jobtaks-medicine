"use server";

import { UserData } from "@/app/Regeister/page";
import { json } from "stream/consumers";

export const registerUser = async (data: UserData) => {
  const res = await fetch(`${process.env.BACKEND_URL}/register`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const userInfo = await res.json();
  return userInfo;
};
