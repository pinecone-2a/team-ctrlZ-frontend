"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import loadingDino from "./loadingDino.json";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "next-client-cookies";

import jwt, { JwtPayload } from "jsonwebtoken";
export default function CreateProfile() {
  interface CustomJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") || "";
  const { userId } = jwtDecode(accessToken) as JwtPayload & {
    userId: string;
  };
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [socialMedia, setSocialMedia] = useState("");

  const [errors, setErrors] = useState({
    image: false,
    name: false,
    about: false,
    socialMedia: false,
  });

  const router = useRouter();

  const isValidName = (name: string) => /^[A-Z][a-zA-Z]*$/.test(name);
  const isValidSocialMedia = (link: string) =>
    /^(http:\/\/|https:\/\/)/.test(link);

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
      setImage(data.secure_url);
      setErrors((prev) => ({ ...prev, image: false }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      image: image === null,
      name: !isValidName(name),
      about: about.trim() === "",
      socialMedia: !isValidSocialMedia(socialMedia),
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      console.log("Submitting profile:", {
        name,
        about,
        avatarImage: image,
        socialMediaURL: socialMedia,
      });

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              about,
              avatarImage: image,
              socialMediaURL: socialMedia,
            }),
          }
        );
        const data = await res.json();

        if (res.ok) {
          router.push("/profile/payment");
        } else {
          const errorText = await res.json();
          console.error("Failed to submit profile:", errorText);
        }
      } catch (error) {
        console.error("Error submitting profile:", error);
      }
    }
  };

  useEffect(() => {
    console.log({ userId });
  }, []);
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex justify-center items-center mt-10 px-4  ">
        <Card className="bg-white p-6 md:p-10 rounded-lg shadow-2xl w-full max-w-lg border-none">
          <CardHeader>
            <CardTitle>Complete your profile page</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Add photo</p>
            <label htmlFor="fileInput" className="cursor-pointer">
              <div
                className={`border-2 border-dashed rounded-full w-[160px] h-[160px] flex justify-center items-center overflow-hidden relative ${
                  errors.image ? "border-red-500" : "border-[#E4E4E7]"
                }`}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : uploading ? (
                  <Lottie animationData={loadingDino} />
                ) : (
                  <Camera className="text-[#E4E4E7]" />
                )}
              </div>
            </label>
            <Input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImageUpload(file);
                }
              }}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-2">Please enter an image</p>
            )}

            <p className="mt-2">Name</p>
            <Input
              className={`mt-2 ${errors.name ? "border-red-500" : ""}`}
              placeholder="Enter your name here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">
                Name must start with a capital letter
              </p>
            )}

            <p className="mt-2">About</p>
            <textarea
              className={`w-full h-[131px] mt-2 p-2 border rounded-md resize-none ${
                errors.about ? "border-red-500" : ""
              }`}
              placeholder="Write about yourself here"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            {errors.about && (
              <p className="text-red-500 text-sm mt-2">
                Please enter info about yourself
              </p>
            )}

            <p className="mt-2">Social media URL</p>
            <Input
              className={`mt-2 ${errors.socialMedia ? "border-red-500" : ""}`}
              placeholder="Enter your social media link"
              value={socialMedia}
              onChange={(e) => setSocialMedia(e.target.value)}
            />
            {errors.socialMedia && (
              <p className="text-red-500 text-sm mt-2">
                Social media link must start with "http://" or "https://"
              </p>
            )}
          </CardContent>

          <CardFooter className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="w-[246px] h-[40px] p-2 mt-6 bg-gray-400 rounded-md hover:bg-[#18181B] transition-all text-[#FAFAFA]"
            >
              Continue
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
