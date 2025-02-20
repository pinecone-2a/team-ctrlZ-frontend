"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy } from "lucide-react";
import { useState } from "react";

type CardProps = {
  data:
    | {
        avatarImage: string;
        name: string;
        socialMediaURL: string;
      }
    | undefined;
  totalEarning: number;
};
export default function Card({ data, totalEarning }: CardProps) {
  return (
    <div className="w-[1000px] h-[300px] border border-[#E4E4E7] rounded-2xl p-4 flex flex-col justify-between">
      <div className="flex justify-between  mt-4 ml-4">
        <div className="flex gap-3">
          {data && (
            <div className="flex gap-3">
              <img
                className="w-[60px] h-[60px]  rounded-full"
                src={data.avatarImage}
              />
              <div className="">
                <p className="font-bold text-xl">{data.name}</p>
                <p className="text-[14px]">{data.socialMediaURL}</p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-full bg-black w-[159px] h-[40px] text-white flex items-center gap-2 justify-center ">
          <Copy className="w-[14px] h-[14px] font-bold" />
          <button className="text-[15px] font-bold ">Share page</button>
        </div>
      </div>
      <div className="bg-[#f4f4f4] w-[95%] h-[1px] mx-auto -mt-10"></div>
      <div className="ml-5 mb-4">
        <div className="flex gap-6 items-center mb-2 ">
          <p className="text-2xl font-semibold">Earnings</p>
          <Select>
            <SelectTrigger className="w-[150px] rounded-full border">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Last 30 days</SelectItem>
              <SelectItem value="dark">Last 90 days</SelectItem>
              <SelectItem value="system">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="font-bold text-4xl">{totalEarning}$</p>
      </div>
    </div>
  );
}
