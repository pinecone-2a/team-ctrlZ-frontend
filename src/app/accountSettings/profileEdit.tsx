"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EditPassword from "./passwordEdit";
import Lottie from "lottie-react";
import loading from "./loading.json";
import { Camera } from "lucide-react";
export default function EditProfile() {
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

  const handleSubmit = () => {
    const newErrors = {
      image: image === null,
      name: !isValidName(name),
      about: about.trim() === "",
      socialMedia: !isValidSocialMedia(socialMedia),
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      localStorage.setItem("userName", name);
    }
  };
  return (
    <div>
      <div>
        <Card className="bg-white p-6 rounded-lg shadow-none w-[651px]">
          <CardHeader>
            <CardTitle>Uptade your profile page</CardTitle>
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
                  <Lottie animationData={loading} />
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
              Save
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
