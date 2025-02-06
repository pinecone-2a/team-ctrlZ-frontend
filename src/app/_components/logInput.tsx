"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LogCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    if (!email) {
      setEmailError("Please enter your email.");
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

    if (valid) {
      console.log("Submitted:", { email, password });
    }
  };

  return (
    <Card className="w-[414px] h-[auto] shadow-none border-none ml-auto mr-auto">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
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
            <p
              className="text-gray-600 opacity-45 duration-300 hover:text-black absolute top-8 left-[330px]"
              onClick={handleClick}
            >
              <span
                className={`absolute transition-opacity duration-300 ${
                  showPassword ? "opacity-100" : "opacity-0"
                }`}
              >
                <Eye />
              </span>
              <span
                className={`absolute transition-opacity duration-300 ${
                  showPassword ? "opacity-0" : "opacity-100"
                }`}
              >
                <EyeOff />
              </span>
            </p>
          </div>
          <CardFooter className="mt-6">
            <Button className="w-full h-[40px] bg-black text-white" type="submit">
              Continue
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
