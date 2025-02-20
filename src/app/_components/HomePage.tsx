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
import { useEffect, useState } from "react";
import { decodeToken } from "@/middleware";
import { JwtPayload } from "jwt-decode";
import { DonorInfo } from "./donorInfo";
import { SkeletonCard } from "./SkeletonCard";

type Data = {
  avatarImage: string;
  name: string;
  socialMediaURL: string;
};

export default function HomePage() {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") || "";
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data | null>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [totalDonation, setTotalDonation] = useState<any>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const { userId } = decodeToken(accessToken) as JwtPayload & {
    userId: string;
  };

  const totalEarnings = totalDonation?.totalEarnings || 0;

  async function fetchData() {
    if (!userId) return;

    try {
      setIsLoading(true);

      const [profileRes, donationRes, totalDonationRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${userId}`),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/donation/${userId}`),
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/donation/total-earnings/${userId}`
        ),
      ]);

      const [profileData, donationData, totalDonationData] = await Promise.all([
        profileRes.json(),
        donationRes.json(),
        totalDonationRes.json(),
      ]);

      setData(profileData);
      setDonations(donationData);
      setTotalDonation(totalDonationData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [userId]);

  // Filter donations based on selected amount
  const filteredDonations = selectedAmount
    ? donations.filter((donation) => donation.amount === selectedAmount)
    : donations;

  return (
    <div className="ml-[180px]">
      <div className="flex justify-center items-center flex-col w-full">
        {isLoading ? (
          <SkeletonCard width="1000px" height="300px" />
        ) : data ? (
          <Card data={data} totalEarning={totalEarnings} />
        ) : (
          <p className="text-gray-500">No profile found.</p>
        )}

        <div>
          <div className="flex justify-between mt-5 items-center">
            <p className="text-2xl font-semibold">Recent transactions</p>
            <Select onValueChange={(value) => setSelectedAmount(Number(value))}>
              <SelectTrigger className="w-[150px] py-5 border-[#E4E4E7] rounded-full">
                <SelectValue placeholder="Amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">All</SelectItem>
                <SelectItem value="1">1$</SelectItem>
                <SelectItem value="2">2$</SelectItem>
                <SelectItem value="5">5$</SelectItem>
                <SelectItem value="10">10$</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-[1000px] flex flex-wrap gap-12 mt-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-full w-[1000px] flex-wrap gap-12 ">
                <SkeletonCard width="300px" height="400px" />
                <SkeletonCard width="300px" height="400px" />
                <SkeletonCard width="300px" height="400px" />
                <SkeletonCard width="300px" height="400px" />
                <SkeletonCard width="300px" height="400px" />
                <SkeletonCard width="300px" height="400px" />
              </div>
            ) : filteredDonations.length > 0 ? (
              filteredDonations
                .slice(0, 6)
                .map((donation) => (
                  <DonorInfo key={donation.id} donation={donation} />
                ))
            ) : (
              <p className="text-gray-500">No recent transactions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
