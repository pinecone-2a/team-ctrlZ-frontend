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
import { JwtPayload } from "jsonwebtoken";
import { decodeToken } from "@/middleware";

export default function Header() {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") || "";
  const { userId } = decodeToken(accessToken) as JwtPayload & {
    userId: string;
  };
  const [data, setData] = useState<any>([]);
  async function getFetchData() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }
  useEffect(() => {
    getFetchData();
  }, []);
  return (
    <div className="flex h-[56px] justify-between w-[95%]  mx-auto p-8">
      <Link href={"/home"}>
        <div className="flex items-center gap-[8px] ml-[60px]">
          <Coffee className="w-[36px] h-[36px]" />
          <p className="text-xl font-bold">Buy Me Coffee</p>
        </div>
      </Link>

      <div className="flex items-center gap-3 mr-28">
        <img
          src={data.avatarImage}
          className="w-[40px] h-[40px] rounded-full"
        />
        <p>{data.name}</p>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <Link href={"/login"}>
              <SelectItem value="log out">Logout</SelectItem>
            </Link>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
