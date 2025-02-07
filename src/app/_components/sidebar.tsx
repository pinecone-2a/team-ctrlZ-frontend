"use client";
import { Badge } from "@/components/ui/badge";
export default function Sidebar() {
  return (
    <div className="bg-[#FFFFFF] w-[350px] h-screen flex flex-col items-end gap-3">
      <Badge className="mr-5 w-[250px] h-[36px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] mt-[40px]">
        Home
      </Badge>
      <Badge className="mr-5 w-[250px] h-[36px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5]">
        Explore
      </Badge>
      <Badge className="mr-5 w-[250px] h-[36px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5]">
        View page
      </Badge>
      <Badge className="mr-5 w-[250px] h-[36px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5]">
        Account settings
      </Badge>
    </div>
  );
}
