"use client";

import React from "react";
import LoginLayout from "../components/login/LoginLayout";
import LeftIllustration from "../components/login/LeftIllustration";
import SignUpForm from "../components/signup/SignupForm";

export default function SignUpPage() {
  return (
    <>
      <LoginLayout />
      <div className="flex h-full w-full flex-col overflow-x-hidden overflow-y-auto md:flex-row md:overflow-hidden bg-[#0b0705]">
        <LeftIllustration />
        <SignUpForm />
      </div>
    </>
  );
}