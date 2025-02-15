"use client";
import { Coffee } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") || "";
  const router = useRouter();

  let userId = "";
  try {
    const decoded = jwtDecode<{ userId: string }>(accessToken);
    userId = decoded.userId;
  } catch (error) {
    console.error("Invalid token:", error);
  }

  const [data, setData] = useState<{ avatarImage?: string; name?: string }>({});

  useEffect(() => {
    if (!userId) return;

    async function getFetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch user data");
        const userData = await res.json();
        setData(userData);
      } catch (error) {
        console.error(error);
      }
    }

    getFetchData();
  }, [userId]);

  const handleLogout = () => {
    cookies.remove("accessToken");
    router.push("/login");
  };

  return (
    <div className="flex h-[56px] justify-between w-[95%] mx-auto p-8">
      <Link href="/home">
        <div className="flex items-center gap-2 ml-16">
          <Coffee className="w-9 h-9" />
          <p className="text-xl font-bold">Buy Me Coffee</p>
        </div>
      </Link>

      <div className="flex items-center gap-3 mr-28">
        {data.avatarImage && (
          <img src={data.avatarImage} className="w-10 h-10 rounded-full" />
        )}
        <p>{data.name || "User"}</p>
        <Select onValueChange={(value) => value === "logout" && handleLogout()}>
          <SelectTrigger>
            <SelectValue placeholder="Logout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="logout">Logout</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
