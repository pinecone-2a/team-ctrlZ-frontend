"use client";
export default function Sidebar() {
  return (
    <div>
      <div className="flex flex-col gap-[8px] mt-10">
        <div className="flex items-center pl-2 text-black w-[250px] h-[36px] rounded rounded-md hover:bg-[#F4F4F5]">Home</div>
        <div className="flex items-center pl-2 text-black w-[250px] h-[36px] rounded rounded-md hover:bg-[#F4F4F5]">Explore</div>
        <div className="flex items-center pl-2 text-black w-[250px] h-[36px] rounded rounded-md hover:bg-[#F4F4F5]">View page</div>
        <div className="flex items-center pl-2 text-black w-[250px] h-[36px] rounded rounded-md hover:bg-[#F4F4F5]">Account settings</div>
      </div>
    </div>
  )
};
