import { Alert, View } from "react-native";
import React from "react";

import Container from "~/components/Container";

import { useState } from "react";
import { supabase } from "~/server/db";
import PassResetForm from "./_components/passResetForm";
import VerifyPassResetEmail from "./_components/verifyPassResetEmail";
import ConfirmPassReset from "./_components/confirmPassReset";

export default function PasswordReset() {
  const [email, setEmail] = useState("");

  const [step, setStep] = useState(0);

  const handleReset = async () => {
    const { error, data } = await supabase.auth.resetPasswordForEmail(email);
    if (error) Alert.alert(error.message);
    else setStep(1);
  };

  return (
    <Container>
      {step === 0 && (
        <PassResetForm handleReset={handleReset} setEmail={setEmail} />
      )}
      {step === 1 && <VerifyPassResetEmail email={email} setStep={setStep} />}
      {step === 2 && <ConfirmPassReset email={email} />}
    </Container>
  );
}
