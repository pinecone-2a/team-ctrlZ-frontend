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
  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Card className="w-[414px] h-[304px] ml-auto mr-auto shadow-none border-none">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          Email
          <Input placeholder="Enter email here" />
        </div>
        <div className="mt-6">
          Password
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password here"
          />
          <p
            className="relative text-gray-600 duration-300 hover:text-black"
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
      </CardContent>
      <CardFooter>
        <Button className="w-[359px] h-[40px] bg-black text-white">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
