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
     
        <div className="w-[1450px] h-[350px] border border-[#E4E4E7] rounded-lg p-4 flex flex-col justify-between">
            <div className="flex justify-between  mt-4 ml-4">
                <div className="flex gap-3">
                    <img className="w-[60px] h-[60px] " src="Avatar.png"/>
                    <div>
                        <p className="font-bold text-xl">Jake</p>
                        <p className="text-md">buymecoffee.com/backonpackage1</p>
                    </div>
                </div>

                <div className="rounded-md bg-black w-[220px] h-[50px] text-white flex items-center pl-2 gap-2 justify-center mr-10">
                    <Copy className="w-[24px] h-[24px]"/>
                    <button className="text-xl">Share page link</button>
                </div>
               
            </div>
            <div className="w-[96%] h-[1px] bg-[#E4E4E7] ml-4 mb-20"></div>
        
            <div className="pl-6">
                <div className="flex gap-10 items-center">
                    <p className="text-2xl  font-semibold">Earnings</p>
                    <Select>
                        <SelectTrigger className="w-[220px] py-2">
                            <SelectValue placeholder="Last 30 days" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Last 30 days</SelectItem>
                            <SelectItem value="dark">Last 90 days</SelectItem>
                            <SelectItem value="system">All time</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
                <p className="font-bold text-5xl my-6">$450</p>
            </div>
        </div>
        
       
    )
};
