"use client";
import { Coffee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface StepTwoProps {
  handleNext: () => void;
  handleBack: () => void;
}

const formFirstSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
});

export function StepTwo({ handleNext, handleBack }: StepTwoProps) {
  const form1 = useForm<z.infer<typeof formFirstSchema>>({
    resolver: zodResolver(formFirstSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit1(values: z.infer<typeof formFirstSchema>) {
    console.log(values);
    handleNext();
  }

  return (
    <div className="font-[family-name:var(--font-inter)] flex">
      <div className="h-screen w-1/2 bg-[#FBBF24]">
        <div className="flex items-center gap-2 pt-12 pl-32">
          <Coffee size={30} />
          <p className="text-[#09090B] text-[21px] font-bold">Buy Me Coffee</p>
        </div>
        <div className="rounded-full items-center justify-center mx-auto mt-[200px] gap-5 flex flex-col">
          <div className="bg-[#D9770680] rounded-full h-[240px] w-[240px] flex items-center justify-center">
            <svg
              width="175"
              height="207"
              viewBox="0 0 175 207"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.0874 83.0255C29.5468 80.7802 31.2354 78.9872 33.4492 78.394L115.841 56.3173C118.054 55.7241 120.413 56.4326 121.934 58.1473L132.918 70.5339L25.7684 99.2445L29.0874 83.0255Z"
                fill="white"
              />
              <path
                d="M19.9952 104.967C19.4186 102.815 20.6956 100.603 22.8475 100.026L135.841 69.7497C137.993 69.1731 140.205 70.4501 140.782 72.602L143.914 84.291C144.49 86.4429 143.213 88.6548 141.061 89.2314L28.0676 119.508C25.9157 120.085 23.7039 118.808 23.1273 116.656L19.9952 104.967Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M129.368 92.363L39.7489 116.376L79.9634 217.311L145.008 199.882L129.368 92.363ZM37.6609 108.584C32.9955 109.834 30.4666 114.875 32.2543 119.362L72.4688 220.297C73.9827 224.097 78.1006 226.162 82.0514 225.104L147.096 207.675C151.047 206.616 153.581 202.769 152.992 198.721L137.351 91.2016C136.656 86.422 131.945 83.3202 127.28 84.5703L37.6609 108.584Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M61.1942 30.729C62.5467 32.4993 62.208 35.0308 60.4378 36.3833C59.9237 36.7761 59.0331 37.9778 58.9165 39.1914C58.8693 39.683 58.9432 40.1937 59.2755 40.7669C59.6268 41.3727 60.3929 42.259 62.0683 43.2263C64.5561 44.6627 66.2799 46.5386 67.2115 48.7491C68.1275 50.9227 68.1231 53.0516 67.814 54.7699C67.5081 56.4694 66.8833 57.9015 66.3753 58.8688C66.1152 59.3639 65.8696 59.7678 65.6808 60.0591C65.586 60.2055 65.5042 60.3253 65.4406 60.4162C65.4087 60.4616 65.3812 60.5 65.3588 60.5309L65.329 60.5717L65.317 60.5879L65.3117 60.5949L65.3093 60.5982C65.3081 60.5997 65.307 60.6013 62.0788 58.1826L65.307 60.6013C63.9712 62.3842 61.443 62.7466 59.6601 61.4108C57.8861 60.0817 57.5184 57.5721 58.8306 55.7908C58.8316 55.7894 58.8328 55.7877 58.8343 55.7855C58.8459 55.769 58.8725 55.7303 58.9104 55.6719C58.987 55.5536 59.1041 55.3628 59.2329 55.1175C59.5026 54.604 59.7603 53.9726 59.8739 53.3412C59.9841 52.7285 59.936 52.2591 59.7772 51.8823C59.6339 51.5423 59.2517 50.9158 58.0344 50.2129C55.4456 48.7182 53.5149 46.9152 52.2963 44.8136C51.0587 42.6791 50.6896 40.4639 50.8859 38.4201C51.2563 34.5629 53.5986 31.4558 55.54 29.9726C57.3102 28.6201 59.8417 28.9588 61.1942 30.729Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M76.5809 15.1314C77.9334 16.9016 77.5948 19.4331 75.8245 20.7856C75.3104 21.1784 74.4198 22.3801 74.3032 23.5937C74.256 24.0854 74.3299 24.5961 74.6622 25.1692C75.0135 25.7751 75.7796 26.6613 77.455 27.6286C79.9429 29.065 81.6666 30.941 82.5982 33.1514C83.5143 35.325 83.5099 37.4539 83.2007 39.1722C82.8949 40.8718 82.27 42.3039 81.762 43.2711C81.5019 43.7662 81.2563 44.1701 81.0675 44.4615C80.9727 44.6078 80.8909 44.7277 80.8273 44.8185C80.7954 44.864 80.768 44.9023 80.7455 44.9332L80.7157 44.9741L80.7037 44.9903L80.6984 44.9973L80.696 45.0005C80.6948 45.0021 80.6937 45.0036 77.4655 42.5849L80.6937 45.0036C79.3579 46.7865 76.8297 47.1489 75.0468 45.8131C73.2729 44.484 72.9052 41.9744 74.2173 40.1931C74.2183 40.1918 74.2195 40.19 74.221 40.1879C74.2326 40.1713 74.2593 40.1327 74.2971 40.0742C74.3738 39.956 74.4908 39.7651 74.6196 39.5199C74.8893 39.0063 75.147 38.3749 75.2606 37.7435C75.3709 37.1309 75.3227 36.6615 75.1639 36.2846C75.0206 35.9447 74.6384 35.3181 73.4211 34.6153C70.8323 33.1206 68.9016 31.3176 67.683 29.2159C66.4454 27.0815 66.0763 24.8662 66.2726 22.8225C66.6431 18.9653 68.9854 15.8581 70.9267 14.3749C72.6969 13.0224 75.2284 13.3611 76.5809 15.1314Z"
                fill="white"
              />
            </svg>
          </div>
          <p className="text-[24px] font-bold text-[#09090B]">
            Fund your creative work
          </p>
          <p className="text-[16px] font-normal text-[#09090B] max-w-[450px] text-center">
            Accept support. Start a membership. Setup a shop. It's easier than
            you think.
          </p>
        </div>
      </div>
      <div className="h-screen w-1/2 bg-[#F9FAFB]">
        <div className="pt-10">
          <button className="w-[83px] h-[45px] border bg-[#F4F4F5] rounded-md text-[#18181B] ml-[1000px]">
            Log in
          </button>
        </div>
        <div className="flex flex-col items-center pt-20">
          <div className="flex flex-col gap-8 mt-48">
            <div>
              <p className="text-[#09090B] text-[32px] font-semibold">
                Welcome,
              </p>
              <p className="text-[#71717A] text-[18px] font-medium">
                Choose a username for your page
              </p>
              <Form {...form1}>
                <form
                  onSubmit={form1.handleSubmit(onSubmit1)}
                  className="space-y-6 mt-10"
                >
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...form1.register("email")}
                        placeholder="Enter email here"
                      />
                    </FormControl>
                    <FormMessage>
                      {form1.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...form1.register("password")}
                        placeholder="Enter password here"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage>
                      {form1.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>

                  <Button
                    type="submit"
                    className="border bg-[#E4E4E7] w-[350px] py-2 rounded-md text-[#FAFAFA]"
                  >
                    Continue
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
