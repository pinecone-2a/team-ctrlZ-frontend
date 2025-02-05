"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import Header from "./Header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateProfile() {
  const [image, setImage] = useState<string | null>(null);
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

  const isValidName = (name: string) => {
    return /^[A-Z][a-zA-Z]*$/.test(name);
  };

  const isValidSocialMedia = (link: string) => {
    return /^(http:\/\/|https:\/\/)/.test(link);
  };

  const handleSubmit = () => {
    const newErrors = {
      image: image === null,
      name: !isValidName(name),
      about: about.trim() === "",
      socialMedia: !isValidSocialMedia(socialMedia),
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      console.log("Profile Submitted:", { name, about, socialMedia, image });
    }
  };

  return (
    <div className="bg-gray-200 h-screen">
      <Header />
      <div className="flex justify-center ">
        <Card className="w-[510px]">
          <CardHeader>
            <CardTitle>Complete your profile page</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p>Add photo</p>
            <label htmlFor="fileInput" className="cursor-pointer">
              <div
                className={`border border-dashed rounded-full w-[160px] h-[160px] flex justify-center items-center overflow-hidden relative ${
                  errors.image ? "border-red-500" : "border-[#E4E4E7]"
                }`}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera />
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
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImage(reader.result as string);
                    setErrors((prev) => ({ ...prev, image: false }));
                  };
                  reader.readAsDataURL(file);
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
                Name must start with a capital letter and contain no numbers
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
            <Link href={"/profile/payment"}>
              <button
                onClick={handleSubmit}
                className="w-[250px] h-[40px] bg-gray-400 rounded-md hover:bg-[#18181B] transition-all text-[#FAFAFA]"
              >
                Continue
              </button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
