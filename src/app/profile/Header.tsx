import Lottie from "lottie-react";
import { Coffee } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between mr-10">
      <div className="flex  text-black gap-2 font-semibold ml-16 mt-10">
        <Coffee />
        Buy Me Coffee
      </div>
      <Link href={"/login"}>
        <button className="w-20 py-2 h-10 rounded-md bg-black text-white mt-10 mr-16 ">
          Log out
        </button>
      </Link>
    </div>
  );
}
