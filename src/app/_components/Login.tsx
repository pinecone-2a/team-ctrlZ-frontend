import { Card } from "@/components/ui/card";
import LogCard from "./logInput";

export default function Login() {
  return (
    <div className="flex items-center justify-evenly min-h-screen ">
      <div>
        <img src="LogPic.png" className=" object-contain" alt="Login" />
      </div>
      <LogCard />
    </div>
  );
}
