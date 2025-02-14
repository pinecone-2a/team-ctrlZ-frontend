"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { use, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingModal from "./loadingModal";
// import { headers } from "next/headers";
// import { response } from "express";

export default function LogCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<any>([]);

  const handleClick = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!email) {
      setEmailError("Please enter your email.");
      valid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;
  };
  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:4000/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setData(data);
      console.log("Response:", data);

      if (data.code === "Incorrect Password") {
        setLoading(false);
        return;
      }

      if (data.data.profile && data.data.bankCard) {
        router.push("/home");
      } else if (data.data.profile == null) {
        router.push("/profile");
      } else if (data.data.bankCard == null) {
        router.push("/profile/payment");
      }
    } catch (e) {
      console.error("Error:", e);
      setLoading(false);
    }
  };

  return (
    <Card className="w-[414px] shadow-none border-none mx-auto">
      <CardHeader>
        <CardTitle className="text-[32px] ">Welcome back</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="relative">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            {data.code && <p className="text-red-500 text-sm">{data.code}</p>}
            <p
              className="text-gray-600 opacity-45 duration-300 hover:text-black absolute top-8 left-[330px] cursor-pointer"
              onMouseDown={handleClick}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </p>
          </div>
          <footer>
            <LoadingModal loading={loading} />
            {!loading && (
              <button
                className="w-[366px] rounded-md h-[40px] bg-black text-white hover:opacity-80 duration-200"
                onClick={handleLogin}
              >
                Continue
              </button>
            )}
          </footer>
        </form>
      </CardContent>
    </Card>
  );
}
