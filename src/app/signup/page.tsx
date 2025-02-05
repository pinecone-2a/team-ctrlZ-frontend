"use client";

import Image from "next/image";
import Sign from "../_components/StepOne";
import Signup from "../_components/StepTwo";
import { useState } from "react";


export default function Signup() {
  const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.username) newErrors.username = "Username is required";
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (!validatePassword(formData.password))
      newErrors.password = "Password must be at least 8 characters long";

  };

  const handleNext = () => {
    let validationErrors = {};
    if (step === 1) validationErrors = validateStep1();
    if (step === 2) validationErrors = validateStep2();

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setStep(step + 1);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {step === 1 && (
          <Sign
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

        {step === 2 && (
          <Signup
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            setStep={setStep}
            handleBack={handleBack}
          />
        )}
    </div>
  )
}
