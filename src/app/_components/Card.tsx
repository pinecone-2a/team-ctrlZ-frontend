"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Copy } from "lucide-react";
  

export default function Card() {
    return(
     
        <div className="w-[907px] h-[257px] border border-[#E4E4E7] rounded-lg p-4 flex flex-col justify-between">
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <img className="w-[48px] h-[48px]" src="Avatar.png"/>
                    <div>
                        <p className="font-bold text-base">Jake</p>
                        <p className="text-sm">buymecoffee.com/backonpackage1</p>
                    </div>
                </div>

                <div className="rounded-md bg-black w-[159px] h-[40px] text-white flex items-center pl-2 gap-2">
                    <Copy className="w-[16px] h-[16px]"/>
                    <button>Share page link</button>
                </div>
            </div>
            <div>
                <div className="flex gap-5 items-center">
                    <p className="text-xl font-semibold">Earnings</p>
                    <Select>
                        <SelectTrigger className="w-[175px]">
                            <SelectValue placeholder="Last 30 days" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Last 30 days</SelectItem>
                            <SelectItem value="dark">Last 90 days</SelectItem>
                            <SelectItem value="system">All time</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
                <p className="font-bold text-4xl">450$</p>
            </div>
        </div>
        
       
    )
};
