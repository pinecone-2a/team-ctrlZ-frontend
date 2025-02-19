import { useEffect, useState } from "react";

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
      <div className="w-[835px] flex justify-between mt-4">
        <div className="flex gap-[8px] items-center">
          <img
            src={donorProfile?.avatarImage}
            className="w-[40px] h-[40px] rounded-full"
          />
          <div className="flex flex-col text-sm">
            <p className="font-bold">{donorProfile?.name}</p>
            <p>{donation.socialURLOrBuyMeACoffee}</p>
          </div>
        </div>
        <div>
          <p className="text-base font-bold ml-12">+${donation.amount}</p>
          <p className="text-sm">10 mins ago</p>
        </div>
      </div>
      <p>{donation.specialMessage}</p>
    </div>
  );
};
