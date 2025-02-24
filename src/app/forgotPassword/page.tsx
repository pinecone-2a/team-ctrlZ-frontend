"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee } from "lucide-react";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Lottie from "lottie-react";
import pacman from "../../pacman.json";

export default function Home() {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateOTP = (otp: string) => /^\d{6}$/.test(otp);

  const sendOTP = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    if (res.ok) {
      toast.success("OTP код илгээгдлээ.");
      setIsDialogOpen(true);
    } else {
      toast.error("Имэйл илгээхэд алдаа гарлаа.");
    }
  };

  const verifyOTP = async () => {
    if (!validateOTP(OTP)) {
      toast.error("6 оронтой зөв OTP код оруулна уу.");
      return;
    }
    setOtpError("");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userOtp: OTP, email }),
      }
    );
    const data = await res.json();
    if (res.ok && data.success) {
      setIsOtpVerified(true);
      toast.success("OTP баталгаажлаа.");
    } else {
      setOtpError(data.message || "Буруу OTP, дахин оролдоно уу.");
      toast.error("Буруу OTP, дахин оролдоно уу.");
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Нууц үг таарахгүй байна.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Нууц үг эсвэл баталгаажуулалт хоосон байна.");
      return;
    }

    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      }
    );
    const data = await res.json();
    setLoading(false);

    if (data?.code === "PASSWORD_UPDATED_SUCCESSFULLY") {
      toast.success("Нууц үг амжилттай шинэчлэгдлээ!");
      setIsDialogOpen(false);
    } else if (data?.error) {
      toast.error("Нууц үг шинэчлэхэд алдаа гарлаа.");
    }
  };

  const handleClick = () => setShowPassword(!showPassword);

  return (
    <div className="bg-white">
      <Toaster richColors position="top-center" />
      <div className="w-2/2 bg-[#FBBF24] pt-4 h-16">
        <div>
          <Link href={"/login"}>
            <div className="flex gap-2 justify-center">
              <Coffee />
              <div className="font-semibold text-[18px]">Buy Me Coffee</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex justify-center mt-40">
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>Нууц үгээ шинэчлэх</CardTitle>
            <CardDescription>
              Таны и-мэйл хаяг руу OTP код илгээгдэнэ.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Имэйл хаяг</Label>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    placeholder="example@gmail.com"
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="mx-auto">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <div className="flex justify-center">
                    <Button
                      onClick={sendOTP}
                      variant={"outline"}
                      className="w-[300px] hover:bg-stone-900 hover:text-white"
                    >
                      OTP илгээх
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>И-мэйлээ шалгана уу</DialogTitle>
                    <DialogDescription>
                      {isOtpVerified
                        ? "Шинэ нууц үгээ оруулна уу"
                        : "Таны OTP кодыг оруулна уу"}
                    </DialogDescription>
                  </DialogHeader>

                  {!isOtpVerified ? (
                    <>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          onChange={(value) => setOTP(value)}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      {otpError && (
                        <p className="text-red-500 text-sm">{otpError}</p>
                      )}
                      <DialogFooter>
                        <Button
                          className="w-full flex justify-center items-center"
                          onClick={verifyOTP}
                          disabled={loading}
                        >
                          {loading ? (
                            <Lottie
                              animationData={pacman}
                              loop
                              autoplay
                              style={{ width: "50px", height: "50px" }}
                            />
                          ) : (
                            "Баталгаажуулах"
                          )}
                        </Button>
                      </DialogFooter>
                    </>
                  ) : (
                    <>
                      <div className="grid gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="new-password">Шинэ нууц үг</Label>
                          <Input
                            type={showPassword ? "text" : "password"}
                            id="new-password"
                            placeholder="********"
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <span
                            className="absolute top-[105px] opacity-30  right-8 cursor-pointer  "
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Eye /> : <EyeOff />}
                          </span>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="confirm-password">
                            Нууц үгээ давтана уу
                          </Label>
                          <Input
                            type={showPassword ? "text" : "password"}
                            id="confirm-password"
                            placeholder="********"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        <span
                          className="absolute top-[182px]  opacity-30 right-8 cursor-pointer  "
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </span>
                        {passwordError && (
                          <p className="text-red-500 text-sm">
                            {passwordError}
                          </p>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          className="w-full"
                          onClick={resetPassword}
                          disabled={loading}
                        >
                          {loading ? (
                            <Lottie
                              animationData={pacman}
                              loop
                              autoplay
                              style={{ width: "50px", height: "50px" }}
                            />
                          ) : (
                            "Нууц үг шинэчлэх"
                          )}
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
          <div className="flex justify-center items-center mb-10">
            <Link href={"/login"}>
              <button className="w-[300px] hover:bg-stone-900 hover:text-white border rounded-md h-9">
                Нүүр хуудас руу буцах
              </button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
