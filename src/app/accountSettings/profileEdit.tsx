"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { decodeToken } from "@/middleware";
import { JwtPayload } from "jwt-decode";
import Lottie from "lottie-react";
import loading from "./loading.json";
import { Toaster, toast } from "sonner";
export default function EditProfile() {
  const [profileData, setProfileData] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") || "";
  const { userId } = decodeToken(accessToken) as JwtPayload & {
    userId: string;
  };

  const [form, setForm] = useState({
    image: "",
    name: "",
    about: "",
    socialMedia: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    about: false,
    socialMedia: false,
  });

  // Fetch existing profile data
  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${userId}`
      );
      const data = await res.json();
      setProfileData(data);
      setForm({
        image: data.avatarImage || "",
        name: data.name || "",
        about: data.about || "",
        socialMedia: data.socialMediaURL || "",
      });
    }
    fetchProfile();
  }, [userId]);

  const isValidName = (name: string) => /^[A-Z][a-zA-Z ]*$/.test(name);
  const isValidSocialMedia = (link: string) =>
    /^(http:\/\/|https:\/\/)/.test(link);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

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
      setForm((prev) => ({ ...prev, image: data.secure_url }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: !isValidName(form.name),
      about: form.about.trim() === "",
      socialMedia: !isValidSocialMedia(form.socialMedia),
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      try {
        console.log(form);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/update/${userId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(form),
          }
        );

        if (res.ok) {
          setSuccessMessage("Profile updated successfully!");
          toast.success("Profile updated successfully!");
        } else {
          console.error("Failed to update profile:", await res.text());
          toast.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      }
    }
  };

  return (
    <div>
      <p className="text-[32px] text-[#09090B] font-extrabold mb-12 -mt-10">
        My account
      </p>
      <Card className="bg-white p-6 rounded-lg shadow-none w-[651px]">
        <CardHeader>
          <CardTitle>Update your profile page</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Add photo</p>
          <label htmlFor="fileInput" className="cursor-pointer">
            <div
              style={{
                backgroundImage: `url(${image || profileData?.avatarImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="border-2 border-dashed rounded-full w-[160px] h-[160px] flex justify-center items-center overflow-hidden relative"
            >
              {uploading ? <Lottie animationData={loading} /> : <Camera />}
            </div>
          </label>
          <Input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleImageUpload(e.target.files[0])
            }
          />

          <p className="mt-2">Name</p>
          <Input
            name="name"
            className={`mt-2 ${errors.name ? "border-red-500" : ""}`}
            placeholder="Enter your name here"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">
              Name must start with a capital letter
            </p>
          )}

          <p className="mt-2">About</p>
          <textarea
            name="about"
            className={`w-full h-[131px] mt-2 p-2 border rounded-md resize-none ${
              errors.about ? "border-red-500" : ""
            }`}
            placeholder="Write about yourself here"
            value={form.about}
            onChange={handleChange}
          />
          {errors.about && (
            <p className="text-red-500 text-sm mt-2">
              Please enter info about yourself
            </p>
          )}

          <p className="mt-2">Social media URL</p>
          <Input
            name="socialMedia"
            className={`mt-2 ${errors.socialMedia ? "border-red-500" : ""}`}
            placeholder="Enter your social media link"
            value={form.socialMedia}
            onChange={handleChange}
          />
          {errors.socialMedia && (
            <p className="text-red-500 text-sm mt-2">
              Must start with "http://" or "https://"
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
  );
}
