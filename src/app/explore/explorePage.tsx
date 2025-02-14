import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";  
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SquareArrowOutUpRight } from "lucide-react";
const fadeScaleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};
export default function Explore() {
  return (
    <div>  
    <div className="w-[909px] h-[340px]  ">
      <div className="mb-20 mt-12 ">
        Explore creaters
        <Input
          className="w-[243px]  "
          type="search"
          placeholder="Search name"
        ></Input>
        <Search className="absolute top-[158px] opacity-45 left-[650px]" />
      </div>
      <div>
        <Card>
          <CardContent className="h-[300px] p-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-4 text-xl font-semibold pl-8">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                Space ranger
              </div>
              <div>
                <Link href={"/viewpage"}>
                  <Button>
                    View page <SquareArrowOutUpRight />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-around gap-7 mt-6">
              <div className="flex flex-col">
                <h1 className="font-semibold text-[16px] ">
                  About Space ranger
                </h1>
                <p className="text-sm mt-4 w-[420px]">
                  All day, every day, we're watching, listening to, reading and
                  absorbing politics. It's exhausting. We then report on what
                  we've seen in a way that's as chill as possible. None of the
                  sensationalism and division you'll find elsewhere. It's about
                  clarity, focus, approachability, and having a little wry smile
                  almost all the time.
                </p>
              </div>
              <div className="flex flex-col">
                <h1 className="font-semibold text-[16px] ">Social media URL</h1>
                <p className="text-sm mt-4">
                  https://buymeacoffee.com/baconpancakes1
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div></div>
  );
}