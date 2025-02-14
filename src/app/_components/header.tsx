"use client";
import { Coffee } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Header() {
  return (
    <div className="flex h-[56px] justify-between w-[95%]  mx-auto p-8">
      <div className="flex items-center gap-[8px] ml-[60px]">
        <Coffee className="w-[36px] h-[36px]" />
        <p className="text-xl font-bold">Buy Me Coffee</p>
      </div>
      <div className="flex items-center gap-3 mr-28">
        <img src="avatar.png" className="w-[40px] h-[40px]" />
        <p>Jake</p>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="log out">Logout</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
