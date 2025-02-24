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
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingModal from "./loadingModal";
import { useCookies } from "next-client-cookies";
import { toast } from "sonner";

export default function LogCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const cookies = useCookies();

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
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      setLoading(false);
      console.log(data);
      const refreshToken = data.result.refreshToken;
      const accessToken = data.result.accessToken;

      cookies.set("accessToken", accessToken);
      cookies.set("refreshToken", refreshToken);
      setLoading(false);
      if (data.code === "Incorrect Password") {
        toast.error("Incorrect password. Please try again.");
        return;
      }
      console.log();

      console.log("Response:", data.data);

      const { profile, bankCard } = data.data;

      if (profile && bankCard) {
        setLoading(true);
        router.push("/home");
      } else if (!profile) {
        toast.success("You need to complete your profile.");
        setLoading(true);
        router.push("/profile");
      } else if (!bankCard) {
        toast.success("Please add your payment details.");
        setLoading(true);
      } else if (!data.data.profile) {
        toast.success("You need to complete your profile.");
        router.push("/profile");
      } else if (!data.data.bankCard) {
        toast.success("Please add your payment details.");
        router.push("/profile/payment");
      }
    } catch (e) {
      console.error("Error:", e);
      toast.error("Failed to log in. Please try again later.");
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
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              className="mt-2"
              type="email"
              placeholder="Enter email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="relative">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              className="mt-2"
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
              className="text-gray-600 opacity-45 duration-300 hover:text-black absolute top-[40px] left-[330px] cursor-pointer"
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
      <Link href={"/forgotPassword"}>
        <p className="text-black flex justify-center font-bold text-[14px]">
          Forgot password ?
        </p>
      </Link>
    </Card>
  );
}
