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
import { DonorInfo } from "./donorInfo";
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
    // console.log(userId);
  }

  useEffect(() => {
    if (userId) {
      getFetchData();
      getDonationData();
      getTotalDonation();
    }
  }, [userId]);

  return (
    <div className="flex w-3/4">
      <div className="">
        <Card data={data} totalEarning={totalEarnings} />
        <div>
          <div className="flex justify-between mt-5 items-center">
            <p className="text-base font-semibold">Recent transactions</p>
            <Select>
              <SelectTrigger className="w-[150px] py-5 border border-[#E4E4E7]">
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
          <div className="w-[1450px] border border-[#E4E4E7] rounded-lg p-6 mt-3">
            {donations?.map((donation: any) => (
              <DonorInfo key={donation.id} donation={donation} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
