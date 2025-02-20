import { useEffect, useState } from "react";
import { Beaker } from "lucide-react";
import { Trash2 } from "lucide-react";

type Props = {
  donation: {
    id: String;
    amount: Number;
    socialURLOrBuyMeACoffee: String;
    specialMessage: String;
  };
};

export const DonorInfo = ({ donation }: any) => {
  const [donorProfile, setDonorProfile] = useState<any>();
  async function getDonorProfile() {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/donor/${donation.donorId}`
    )
      .then((res) => res.json())
      .then((data) => setDonorProfile(data));
  }
  useEffect(() => {
    if (donation.donorId) {
      getDonorProfile();
    }
  }, [donation.donorId]);

  console.log(donorProfile);
  return (
    <div key={donation.id}>
      <div className="w-[300px]  h-[400px] border rounded-2xl ">
        <div className="flex gap-[8px] items-center flex-col">
          <img
            src={donorProfile?.avatarImage}
            className="w-[270px] h-[200px] rounded-2xl mt-3 object-cover object-center"
          />
        </div>
        <div className="flex items-center w-[270px] mx-auto justify-between mt-2">
          <p className="font-bold text-[20px]">Supporters</p>
          <div className="w-18 h-7 bg-[#d7e8f5] rounded-full flex justify-center items-center text-[13px] p-4 font-bold ">
            10 months
          </div>
        </div>
        <div className="text-gray-500 font-bold mx-auto w-[270px]">
          {donorProfile?.name}
        </div>
        <div className="w-[270px] mx-auto text-[12px] mt-4">
          {" "}
          <p>{donation.specialMessage}</p>
        </div>
        <div className="h-[1px] w-[90%] mx-auto mb-2 mt-8 bg-[#e4e4e7]"></div>
        <div className="w-[100%]  h-12  rounded-b-2xl flex justify-between px-4 items-center ">
          <p className="text-[20px] font-bold  text-black">
            USD {donation.amount}
          </p>
          <div className="w-15 h-7 bg-black text-white rounded-md p-4 flex justify-center items-center">
            <p className="text-sm">View page</p>
          </div>
        </div>
      </div>
    </div>
  );
};
