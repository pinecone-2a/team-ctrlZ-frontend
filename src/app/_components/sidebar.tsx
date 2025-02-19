"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { SquareArrowOutUpRight } from 'lucide-react';
const fadeScaleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function Sidebar() {
  return (
    <div className="bg-[#FFFFFF] w-1/4  flex flex-col items-center gap-3 ">
      <Link href={"/home"}>
        <div className="mr-5 w-[300px] h-[42px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] flex items-center pl-4">
          Home
        </div>
      </Link>
      <Link href={"/explore"}>
        <div className="mr-5 w-[300px] h-[42px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] flex items-center pl-4">
          Explore
        </div>
      </Link>
      <Link href={"/viewpage"}>
        <div className="mr-5 w-[300px] h-[42px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] gap-2 flex items-center pl-4">
          View page <SquareArrowOutUpRight className="w-[16px] h-[16px] opacity-60 items-center"/>
        </div>
      </Link>
      <Link href={"/accountSettings"}>
        <div className="mr-5 w-[300px] h-[42px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] flex items-center pl-4">
          Account Settings
        </div>
      </Link>
    </div>
  );
}
