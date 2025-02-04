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
export default function CreateProfile() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <Card className="w-[510px] h-[631px] ">
        <CardHeader>
          <CardTitle> Complete your profile page</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <p>Add photo</p>
          <button className="border border-dashed border-[#E4E4E7] rounded-full  w-[160px] h-[160px] ">
            <Camera className="flex justify-center" />
          </button>

          <p className="">
            Name
            <Input className="" placeholder="  Enter your name here" />
          </p>
          <p>
            About
            <Input
              className="h-[131px]"
              placeholder="Write about yourself here"
            />
          </p>
          <p>
            Social media URL
            <Input />
          </p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
