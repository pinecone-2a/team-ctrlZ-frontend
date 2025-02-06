"use client";

import Image from "next/image";

// import Signup from "../_components/StepTwo";
import { useState } from "react";
import { StepOne } from "../_components/StepOne";
import { StepTwo } from "../_components/StepTwo";

export default function Signup() {
  const [step, setStep] = useState<number>(1);

  const handleNext = (): void => {
    setStep(step + 1);
  };

  const handleBack = (): void => {
    setStep(step - 1);
  };

  return (
    <div>
      {step === 1 && (
        <StepOne handleNext={handleNext} handleBack={handleBack} />
      )}
      {step === 2 && (
        <StepTwo handleNext={handleNext} handleBack={handleBack} />
      )}
    </div>
  );
}
