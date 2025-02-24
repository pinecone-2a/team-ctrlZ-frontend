import { useEffect, useState } from "react";
import { SkeletonCard } from "./SkeletonCard";
import Link from "next/link";
type Props = {
  donation: {
    id: string;
    amount: number;
    socialURLOrBuyMeACoffee: string;
    specialMessage: string;
    donorId?: string;
  };
};

export const DonorInfo = ({ donation }: Props) => {
  const [donorProfile, setDonorProfile] = useState<any>(null);

  async function getDonorProfile() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/donor/${donation.donorId}`
      );
      const data = await response.json();
      setDonorProfile(data);
    } catch (error) {
      console.error("Error fetching donor profile:", error);
    }
  }

  useEffect(() => {
    if (donation.donorId) {
      getDonorProfile();
    }
  }, [donation.donorId]);

  return (
    <div key={donation.id} className="w-[300px] h-[400px] border rounded-2xl">
      <div className="flex gap-[8px] items-center flex-col">
        <img
          src={donorProfile?.avatarImage}
          alt="Donor"
          className="w-[270px] h-[200px] rounded-2xl mt-4 object-cover object-center"
        />
      </div>
      <div className="flex items-center w-[270px] mx-auto justify-between mt-2">
        <p className="font-bold text-[20px]">Supporter ☕</p>
        <div className="w-18 h-7 bg-[#d7e8f5] rounded-full flex justify-center items-center text-[13px] p-4 font-bold">
          10 months
        </div>
      </div>
      <div className="text-gray-500 font-bold mx-auto w-[270px] text-[13px]">
        {donorProfile?.name}
      </div>
      <div className="w-[270px] mx-auto text-[12px] mt-4">
        <p>{donation?.specialMessage}</p>
      </div>
      <div className="h-[1px] w-[90%] mx-auto mb-1 mt-8 bg-[#e4e4e7]"></div>
      <div className="w-full h-12 rounded-b-2xl flex justify-between px-4 items-center">
        <p className="text-[25px] font-bold text-green-500">
          ${donation?.amount}
        </p>
        <Link href={`/viewpage/${donorProfile?.name}`}>
          <div className="w-15 h-7 bg-blue-600 text-white rounded-md p-4 flex justify-center items-center">
            <p className="text-sm">View page</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
