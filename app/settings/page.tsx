import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import PageClient from "./page.client";

export default async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userInfo = session?.user;
  return <PageClient userInfo={userInfo} />;
};
