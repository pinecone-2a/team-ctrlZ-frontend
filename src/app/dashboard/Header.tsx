'use client';
import { Coffee } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function Header() {
    return(
        <div className="flex justify-between p-5">
            <div className="flex items-center gap-[8px]">
                <Coffee className="w-[24px] h-[24px]"/>
                <p className="text-base font-bold">Buy Me Coffee</p>
            </div>
            <div className="flex items-center gap-3">
                <img src="avatar.png" className="w-[40px] h-[40px]"/>
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
    )
};