"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { Heart } from "lucide-react";
import { Coffee } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import { useParams } from "next/navigation";
export default function EachProfile() {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") || "";
  const { name } = useParams();

  const { userId } = jwtDecode(accessToken) as JwtPayload & {
    userId: string;
  };
  console.log(userId);
  const [data, setData] = useState<any>([]);
  async function getFetchData() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/view/${name}`)
      .then((res) => res.json())
      .then((data) => setData(data[0]));
  }
  useEffect(() => {
    getFetchData();
  }, []);
  console.log(data);
  const [amount, setAmount] = useState(5);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const amounts = [1, 2, 5, 10];

  return (
    <div>
      <div className="w-full bg-[#F4F4F5] h-[450px] flex justify-center items-center absolute">
        <Button className="flex justify-center items-center">
          <Camera /> Add a cover image
        </Button>
      </div>
      <div className="flex justify-center gap-16 relative top-[350px] ">
        <div className="flex flex-col gap-6">
          <Card className="w-[623px] h-[233px]  p-6">
            <div className="flex justify-between">
              <Avatar>
                <AvatarImage src={data.avatarImage} />
              </Avatar>
              <Link href={"/accountSettings"}>
                <Button>Edit page</Button>
              </Link>{" "}
            </div>
            <div className="bg-[#E4E4E7] h-[1px] w-full mt-7"> </div>
            <h1 className="font-semibold text-[16px] mt-4">
              About {data.name}
            </h1>
            <p className="mt-4">{data.about}</p>
          </Card>
          <Card className="w-[623px] h-[116px] p-6">
            <CardTitle>Social media URL</CardTitle>
            <p className="mt-5"> {data.socialMediaURL}</p>
          </Card>
          <Card className="w-[623px] h-[236px] p-6">
            <CardTitle>Recent Supporters</CardTitle>
            <Card className="w-[584px] h-[140px] flex flex-col items-center mt-6 justify-center">
              <Heart />
              <p className="font-semibold text-[16px] mt-3">
                Be the first one to support Jake
              </p>
            </Card>
          </Card>
        </div>

        <div>
          <Card className="w-[628px] h-[509px] p-6">
            <h2 className="text-xl font-bold">Buy Jake a Coffee</h2>
            <p className="mt-2 text-gray-600">Select amount:</p>
            <div className="flex gap-2 mt-2">
              {[1, 2, 5, 10].map((value) => (
                <Button
                  className="gap-2"
                  key={value}
                  onClick={() => setAmount(value)}
                  variant={amount === value ? "default" : "outline"}
                >
                  <Coffee /> ${value}
                </Button>
              ))}
            </div>
            <div className="mt-4">
              <label className="font-medium text-[14px]">
                Enter BuyMeCoffee or social account URL:
              </label>
              <Input
                placeholder="buymeacoffee.com/"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mt-4">
              <label className=" font-medium text-[14px]">
                Special message:
              </label>
              <Textarea
                placeholder="Please write your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 w-[580px] h-[131px]"
              />
            </div>
            <Button className="mt-4 w-full" disabled={!url.trim()}>
              Support
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
