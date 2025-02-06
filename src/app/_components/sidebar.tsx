"use client";

import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Sidebar() {
  return (
    <div className="mt-20">
      <Tabs defaultValue="Home">
        <TabsList className="flex flex-col gap-4">
          <TabsTrigger className="bg-white text-black w-32" value="Home">Home</TabsTrigger>
          <TabsTrigger className="bg-white text-black w-32"  value="Explore">Explore</TabsTrigger>
          <TabsTrigger className="bg-white text-black w-32"  value="View page">View page</TabsTrigger>
          <TabsTrigger className="bg-white text-black w-32"  value="Account settings">Account settings</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
};
