"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Coffee } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import { useParams } from "next/navigation";
import { Toaster, toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EachProfile() {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") || "";
  const { name } = useParams();

  const { userId } = jwtDecode(accessToken) as JwtPayload & {
    userId: string;
  };

  const [data, setData] = useState<any>({});
  const [amount, setAmount] = useState(5);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/view/${name}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setData(result[0] || {});
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    fetchData();
  }, [name]);

  const sendDonation = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/donation/create-donation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            amount,
            specialMessage: message,
            socialURLOrBuyMeACoffee: url,
            donorId: userId,
            recipentId: data.userId,
          }),
        }
      );
      const response = await res.json();
      console.log(response);
      return response;
    } catch (error) {
      console.error("Donation error:", error);
      throw error;
    }
  };

  const handlePayment = async () => {
    setIsSubmitting(true);
    const paymentResponse = await sendDonation();
    try {
      if (paymentResponse) {
        toast.success(`You donated to ${data.name} ${amount} successfully`);
      }
    } catch (error) {
      toast.error("Donation failed");
    } finally {
      setIsSubmitting(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${data.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full bg-[#F4F4F5] h-[450px] flex justify-center items-center absolute"
      ></div>

      <div className="flex justify-center gap-16 relative top-[350px]">
        <div className="flex flex-col gap-6">
          <Card className="w-[623px] h-[233px] p-6">
            <div className="flex justify-between">
              <Avatar>
                <AvatarImage src={data.avatarImage} />
              </Avatar>
            </div>
            <div className="bg-[#E4E4E7] h-[1px] w-full mt-7"></div>
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
                Be the first one to support {data.name}
              </p>
            </Card>
          </Card>
        </div>

        <div>
          <Card className="w-[628px] h-[509px] p-6">
            <h2 className="text-xl font-bold">Buy {data.name} a Coffee</h2>
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
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="mt-4 w-full"
              disabled={!url.trim()}
            >
              Support
            </Button>
          </Card>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="relative flex flex-col py-10">
          <div className="relative w-full flex justify-center">
            <img
              className="rounded-full w-24 h-24 absolute -top-20 border-4 border-white"
              src={data.avatarImage}
              alt="Avatar"
            />
          </div>

          <DialogHeader className="mt-4">
            <DialogTitle className="flex gap-2 font-semibold justify-center mb-1">
              <p className="font-thin">Support</p> {data.name}
            </DialogTitle>
            <DialogDescription
              asChild
              className="flex flex-col items-center text-center"
            >
              <div>
                <div className="flex gap-1">
                  You'll be charged
                  <div className="font-extrabold flex items-center ">
                    ${amount}
                  </div>
                </div>
                <div>
                  <Toaster position="top-center" />
                  <Button
                    className="font-extrabold w-full mt-10"
                    onClick={handlePayment}
                    disabled={isSubmitting}
                  >
                    Pay
                  </Button>
                </div>
                <div className="flex flex-col items-center text-center mt-6 text-[10px] leading-3">
                  Payment secured by
                  <p className="font-bold font-mono">Chingis</p>
                  You’ll be taken to a thank you page after the payment. Terms
                  and Privacy.
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
