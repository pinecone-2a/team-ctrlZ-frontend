"use client";
import { Coffee } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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
    <div className="flex h-[56px] justify-between w-[97%] mx-auto p-8">
      <Link href="/home">
        <div className="flex items-center gap-2 ml-16">
          <Coffee className="w-9 h-9" />
          <p className="text-xl font-bold">Buy Me Coffee</p>
        </div>
      </Link>

      <div className="flex items-center gap-3 mr-28 mt-6">
        {data.avatarImage ? (
          <img src={data.avatarImage} className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        )}
        <p>{data.name || "User"}</p>
        <Select
          onValueChange={(value) =>
            value === "logout" && setShowLogoutDialog(true)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="logout">Log out</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogTrigger asChild>
            <div />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to log out?</DialogTitle>
              <DialogDescription>
                <Button className="w-full mt-4" onClick={handleLogout}>
                  Confirm
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
