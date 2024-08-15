"use server";

import { FormValues } from "@/app/loging/page";

export const loginUser = async (data: FormValues) => {
  const res = await fetch(`${process.env.BACKEND_URL}/login`, {
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
