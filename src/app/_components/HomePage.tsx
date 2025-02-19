"use client";

import Sidebar from "./sidebar";
import Card from "./Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { useEffect, useId, useState } from "react";
import { decodeToken } from "@/middleware";
import { JwtPayload } from "jwt-decode";
type Data = {
  avatarImage: string;
  name: string;
  socialMediaURL: string;
};
export default function HomePage() {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") || "";
  const { userId } = decodeToken(accessToken) as JwtPayload & {
    userId: string;
  };
  console.log(userId);
  const [data, setData] = useState<Data>();
  const [donations, setDonations] = useState<any>([]);
  const [totalDonation, setTotalDonation] = useState<any>();
  const totalEarnings = totalDonation?.totalEarnings;
  async function getFetchData() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  async function getDonationData() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/donation/${userId}`)
      .then((res) => res.json())
      .then((data) => setDonations(data));
  }
  async function getTotalDonation() {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/donation/total-earnings/${userId}`
    )
      .then((res) => res.json())
      .then((data) => setTotalDonation(data));
    console.log(userId);
  }
  useEffect(() => {
    if (userId) {
      getFetchData();
      getDonationData();
      getTotalDonation();
    }
  }, [userId]);
  console.log(data);
  return (
    <div className="ml-[180px]">
      <div className="flex justify-center items-center flex-col w-[100%]">
        <Card data={data} totalEarning={totalEarnings} />
        <div>
          <div className="flex justify-between mt-5 items-center">
            <p className="text-2xl font-semibold">Recent transactions</p>
            <Select>
              <SelectTrigger className="w-[150px] py-5 border-[#E4E4E7] rounded-full">
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
          <div className="w-[1000px] rounded-lg flex flex-wrap gap-11 mt-6">
            {donations.slice(0, 6).map((donation: any) => (
              <div
                key={donation.id}
                className=" border-[#E4E4E7] border rounded-2xl  "
              >
                <div className="w-[300px] h-[450px] flex flex-col items-center justify-center  ">
                  <div className="-mt-16 flex flex-col items-center gap-4 font-bold">
                    <img
                      src="Avatar.jpg"
                      className="w-[150px] h-[150px] rounded-full "
                    />
                    <p className="text-[20px] text-[#09090B]">Cutiez</p>
                    <div>
                      <p className="text-base font-bold ml-12 text-green-500">
                        +${donation.amount}
                      </p>
                      <p className="text-sm">10 mins ago</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
