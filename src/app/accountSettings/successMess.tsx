import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function SuccessMess() {
  return (
    <div className="w-[651px]">
      <Card>
        <CardHeader>
          <CardTitle>Success page</CardTitle>
        </CardHeader>
        <CardContent>
          Confirmation message
          <Textarea
            className="h-[100px] text-start"
            placeholder="Edit your message for your fans"
          ></Textarea>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
