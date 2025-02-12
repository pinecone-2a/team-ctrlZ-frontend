"use client";

import Sidebar from "./sidebar";
import Card from "../homepage/Card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function HomePage() {
    return(
        <div className="flex">
            <Sidebar />
        <div className="m-10">
            <Card/>
            <div>
                <div className="flex justify-between mt-5 items-center">
                    <p className="text-base font-semibold">Recent transactions</p>
                    <Select>
                        <SelectTrigger className="w-[109px] border border-[#E4E4E7]">
                            <SelectValue placeholder="Amount" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="one dollar">1$</SelectItem>
                            <SelectItem value="two dollar">2$</SelectItem>
                            <SelectItem value="five dollar">5$</SelectItem>
                            <SelectItem value="ten dollar">10$</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-[907px] border border-[#E4E4E7] rounded-lg p-6 mt-3">
                    <div className="w-[835px] flex justify-between mt-4">
                        <div className="flex gap-[8px] items-center">
                            <img src="pro.png" className="w-[40px] h-[40px] rounded-full"/>
                            <div className="flex flex-col text-sm">
                                <p className="font-bold">Cutiez</p>
                                <p>buymecoffee.com/kissyface</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-base font-bold ml-12">+$2</p>
                            <p className="text-sm">10 mins ago</p>
                        </div>
                    </div>

                    <div className="w-[835px] flex justify-between mt-10">
                        <div className="flex gap-[8px] items-center">
                            <img src="user.png" className="w-[40px] h-[40px] rounded-full"/>
                            <div className="flex flex-col text-sm">
                                <p className="font-bold">John Doe</p>
                                <p>buymecoffee.com/bdsadas</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-base font-bold ml-12">+$5</p>
                            <p className="text-sm">5 hours ago</p>
                        </div>
                    </div>
                    <div className="text-sm mt-2">
                            <p>Thank you for being awasome everyday!</p>
                    </div>
                </div>
            </div>
        </div>{""}
        </div>
    )
};
