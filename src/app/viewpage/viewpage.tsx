"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, useRef } from "react";
import { Camera, Heart, Coffee } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import { Label } from "@/components/ui/label";

export default function VPmain() {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") || "";
  const { userId } = jwtDecode(accessToken) as JwtPayload & { userId: string };

  const [data, setData] = useState<any>({});
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [amount, setAmount] = useState(5);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const amounts = [1, 2, 5, 10];
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    fetchData();
  }, [userId]);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "buy-me-coffee");
    formData.append("folder", "buy-me-coffee");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkvry8fsz/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      const newImageUrl = data.secure_url;
      console.log(newImageUrl);
      setBackgroundImage(newImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const addBackground = async () => {
    setUploading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            backgroundImage,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to update background image");
    } catch (e) {
      console.log(e);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Label>
        <div
          className="w-full h-[450px] flex justify-center items-center relative mt-10"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : `url(${data.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: !backgroundImage ? "#000000" : "transparent",
          }}
        >
          {!backgroundImage && !data.backgroundImage && (
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex justify-center items-center"
            >
              <Camera /> {uploading ? "Uploading..." : "Add a cover image"}
            </Button>
          )}
          {backgroundImage && (
            <Button
              className={`${!uploading ? "hidden" : "block"}`}
              onClick={addBackground}
            >
              {uploading ? "Uploading..." : "Save change"}
            </Button>
          )}
          <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleImageUpload(e.target.files[0])
            }
          />
        </div>
      </Label>

      <div className="flex justify-center gap-16 absolute  top-[500px] left-[400px]">
        <div className="flex flex-col gap-6">
          <Card className="w-[623px] h-[233px] p-6">
            <div className="flex justify-between">
              <Avatar>
                <AvatarImage src={data.avatarImage} />
              </Avatar>
              <p className="font-extrabold text-2xl  ">{data.name}</p>
              <Link href="/accountSettings">
                <Button>Edit page</Button>
              </Link>
            </div>

            <div className="bg-[#E4E4E7] h-[1px] w-full mt-7"> </div>
            <h1 className="font-semibold text-[16px] mt-4">
              About {data.name}
            </h1>
            <p className="mt-4">{data.about}</p>
          </Card>
          <Card className="w-[623px] h-[116px] p-6">
            <CardTitle>Social media URL</CardTitle>
            <p className="mt-5">{data.socialMediaURL}</p>
          </Card>
          <Card className="w-[623px] h-[236px] p-6">
            <CardTitle>Recent Supporters</CardTitle>
            <Card className="w-[584px] h-[140px] flex flex-col items-center mt-6 justify-center">
              <Heart />
              <p className="font-semibold text-[16px] mt-3">
                Be the first one to support {data.name || "this creator"}
              </p>
            </Card>
          </Card>
        </div>

        <div>
          <Card className="w-[628px] h-[509px] p-6">
            <h2 className="text-xl font-bold">
              Buy {data.name || "this creator"} a Coffee
            </h2>
            <p className="mt-2 text-gray-600">Select amount:</p>
            <div className="flex gap-2 mt-2">
              {amounts.map((value) => (
                <Button
                  key={value}
                  onClick={() => setAmount(value)}
                  variant={amount === value ? "default" : "outline"}
                  className="gap-2"
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
              <label className="font-medium text-[14px]">
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
