import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function EditPassword() {
  return (
    <div>
      <div className="w-[651px] h-1/3 shadow-none">
        <Card>
          <CardHeader>
            <CardTitle>Create new password</CardTitle>
          </CardHeader>
          <CardContent className="mt-5">
            <div className=" mb-6">
              New password
              <Input placeholder="Enter new password"></Input>
            </div>
            <div>
              Confirm new password
              <Input placeholder="Confirm password"></Input>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-11">Save changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
