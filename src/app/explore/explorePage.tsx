import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SquareArrowOutUpRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SkeletonCard } from "../_components/SkeletonCard";

export default function Explore() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getFetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/explore`,
        {
          credentials: "include",
        }
      );
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <div>
      <div className="w-[1300px]">
        <div className="flex gap-2 flex-col mb-10">
          <div className="mb-5 mt-8 font-extrabold text-[32px]">
            Explore Creators
          </div>

          <div className="relative">
            <Input
              className="w-[243px]"
              type="search"
              placeholder="Search name"
            />
            <Search className="opacity-45 absolute top-2 left-52 w-5 h-5" />
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className="flex flex-col gap-10">
              <SkeletonCard width="1300px" height="300px" />
              <SkeletonCard width="1300px" height="300px" />
              <SkeletonCard width="1300px" height="300px" />
            </div>
          ) : data.length > 0 ? (
            data.map((profile: any) => (
              <Card key={profile.id} className="mb-10">
                <CardContent className="h-[300px] p-6">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-4 text-xl font-semibold pl-8">
                      <Avatar>
                        <AvatarImage src={profile.avatarImage} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      {profile.name}
                    </div>
                    <div>
                      <Link href={`/viewpage/${profile.name}`}>
                        <Button>
                          View page <SquareArrowOutUpRight />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-around gap-7 mt-6">
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-[16px]">
                        About {profile.name}
                      </h1>
                      <p className="text-sm mt-4 w-[420px]">{profile.about}</p>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-[16px]">
                        Social media URL
                      </h1>
                      <p className="text-sm mt-4">{profile.socialMediaURL}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">No creators found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
