"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
export default function Sidebar() {
  return (
    <div className="bg-[#FFFFFF] w-[350px]  flex flex-col items-end gap-3 ">
      <Link href={"/Home"}>
        <Badge className="mr-5 w-[250px] h-[36px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] mt-[40px]">
          Home
        </Badge>
      </Link>
      <Link href={"/explore"}>
        <Badge className="mr-5 w-[250px] h-[36px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5]">
          Explore
        </Badge>
      </Link>
      <Link href={"/viewpage"}>
        <Badge className="mr-5 w-[250px] h-[36px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5]">
          View page
        </Badge>
      </Link>
      <Link href={"/accountSettings"}>
        <Badge className="mr-5 w-[250px] h-[36px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5]">
          Account settings
        </Badge>
      </Link>
    </div>
  )
};
