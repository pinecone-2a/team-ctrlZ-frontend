import { Card } from "@/components/ui/card";
import LogCard from "./logInput";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="flex items-center justify-evenly min-h-screen relative">
      <Button className="absolute top-5 right-5">Sign up</Button>
      <div>
        <img src="LogPic.png" className="object-contain" alt="Login" />
      </div>
      <LogCard />
    </div>
  );
}
