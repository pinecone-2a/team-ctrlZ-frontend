import { Coffee } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between mr-10">
      <div className="flex  text-black gap-2 font-semibold ml-16 mt-10">
        <Coffee />
        Buy Me Coffee
      </div>
      <button className="w-16 h-10 rounded-md bg-gray-200 text-[#18181B] mt-10 mr-16 ">
        Log out
      </button>
    </div>
  );
}
