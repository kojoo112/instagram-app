import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/auth";
import { getProviders } from "next-auth/react";
import SignIn from "@/components/SignIn";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign up Or Login to Instagram",
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

const SingInPage = async ({ searchParams: { callbackUrl } }: Props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className="flex justify-center mt-24">
      <SignIn providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
};

export default SingInPage;
