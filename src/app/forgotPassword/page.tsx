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
import Link from "next/link";

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
      alert("OTP код илгээгдлээ.");
      setIsDialogOpen(true);
    } else {
      setEmailError("Имэйл илгээхэд алдаа гарлаа.");
    }
  };

  const verifyOTP = async () => {
    if (!validateOTP(OTP)) {
      setOtpError("6 оронтой зөв OTP код оруулна уу.");
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
    } else {
      setOtpError(data.message || "Буруу OTP, дахин оролдоно уу.");
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Нууц үг таарахгүй байна.");
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      }
    );
    const data = await res.json();
    if (data?.code == "PASSWORD_UPDATED_SUCCESSFULLY") {
      alert("Нууц үг амжилттай шинэчлэгдлээ!");
      setIsDialogOpen(false);
    } else if (data?.error) {
      setPasswordError("Нууц үг шинэчлэхэд алдаа гарлаа.");
    }
  };

  return (
    <div className="bg-white">
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
                        <Button className="w-full" onClick={verifyOTP}>
                          Баталгаажуулах
                        </Button>
                      </DialogFooter>
                    </>
                  ) : (
                    <>
                      <div className="grid gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="new-password">Шинэ нууц үг</Label>
                          <Input
                            type="password"
                            id="new-password"
                            placeholder="********"
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="confirm-password">
                            Нууц үгээ давтана уу
                          </Label>
                          <Input
                            type="password"
                            id="confirm-password"
                            placeholder="********"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        {passwordError && (
                          <p className="text-red-500 text-sm">
                            {passwordError}
                          </p>
                        )}
                      </div>
                      <DialogFooter>
                        <Button className="w-full" onClick={resetPassword}>
                          Нууц үг шинэчлэх
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
