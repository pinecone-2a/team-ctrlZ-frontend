"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coffee } from "lucide-react";
import CountrySelect from "../_components/CountrySelect";

export default function PaymentPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    country: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({
    country: false,
    firstName: false,
    lastName: false,
    cardNumber: false,
    month: false,
    year: false,
    cvc: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = () => {
    const newErrors = {
      country: form.country === "",
      firstName: form.firstName.trim() === "",
      lastName: form.lastName.trim() === "",
      cardNumber: form.cardNumber.trim() === "" || form.cardNumber.length < 16,
      month: form.month === "",
      year: form.year === "",
      cvc: form.cvc.trim() === "" || form.cvc.length < 3,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      console.log("Form submitted:", form);
      router.push("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between p-6">
        <div className="flex items-center text-black gap-2 font-semibold">
          <Coffee />
          Buy Me Coffee
        </div>
        <button className="w-20 h-10 rounded-md bg-gray-200 text-black">
          Log out
        </button>
      </header>

      <div className="flex justify-center items-center mt-10 px-4">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-xl md:text-2xl font-semibold">
            How would you like to be paid?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter location and payment details
          </p>

          <CountrySelect
            onSelect={(value) => setForm({ ...form, country: value })}
            error={errors.country}
          />

          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
              <label className="block font-medium">First name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={`w-full p-2 mt-1 border rounded-md ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">First name is required</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block font-medium">Last name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className={`w-full p-2 mt-1 border rounded-md ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">Last name is required</p>
              )}
            </div>
          </div>

          <label className="block font-medium mt-4">Enter card number</label>
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            className={`w-full p-2 mt-1 border rounded-md ${
              errors.cardNumber ? "border-red-500" : ""
            }`}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">
              Invalid card number (16 digits required)
            </p>
          )}

          <div className="flex gap-4 mt-4">
            <div className="w-1/3">
              <label className="block font-medium">Expires</label>
              <select
                name="month"
                value={form.month}
                onChange={handleChange}
                className={`w-full p-2 mt-1 border rounded-md ${
                  errors.month ? "border-red-500" : ""
                }`}
              >
                <option value="">Month</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={(i + 1).toString().padStart(2, "0")}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {errors.month && (
                <p className="text-red-500 text-sm">Invalid month</p>
              )}
            </div>
            <div className="w-1/3">
              <label className="block font-medium">Year</label>
              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                className={`w-full p-2 mt-1 border rounded-md ${
                  errors.year ? "border-red-500" : ""
                }`}
              >
                <option value="">Year</option>
                {[...Array(10)].map((_, i) => (
                  <option
                    key={i}
                    value={(new Date().getFullYear() + i).toString()}
                  >
                    {new Date().getFullYear() + i}
                  </option>
                ))}
              </select>
              {errors.year && (
                <p className="text-red-500 text-sm">Invalid year</p>
              )}
            </div>
            <div className="w-1/3">
              <label className="block font-medium">CVC</label>
              <input
                type="text"
                name="cvc"
                value={form.cvc}
                onChange={handleChange}
                placeholder="CVC"
                className={`w-full p-2 mt-1 border rounded-md ${
                  errors.cvc ? "border-red-500" : ""
                }`}
              />
              {errors.cvc && (
                <p className="text-red-500 text-sm">
                  Invalid CVC (3 digits required)
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full mt-6 p-2 rounded-md text-white bg-black hover:bg-gray-800"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
